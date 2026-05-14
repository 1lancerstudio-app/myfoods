import { type FormEvent, useState } from 'react'
import { useCatalog } from '@/context/CatalogContext'
import type { Product, ProductCategory } from '@/types'
import { formatINR } from '@/lib/storage'
import { slugify } from '@/lib/slugify'

const emptyForm: Omit<Product, 'id' | 'slug'> = {
  name: '',
  category: 'muesli',
  tagline: '',
  description: '',
  ingredients: [],
  nutrition: [],
  images: ['/images/muesli.svg'],
  variants: [
    { grams: 250, price: 0 },
    { grams: 500, price: 0 },
  ],
  rating: 4.8,
  stock: 0,
}

function newId() {
  return `p-${Math.random().toString(36).slice(2, 10)}`
}

export function AdminProductsPage() {
  const { products, upsertProduct, deleteProduct } = useCatalog()
  const [draft, setDraft] = useState<Product | null>(null)
  const [ingredientsText, setIngredientsText] = useState('')

  const isCreate = draft?.slug === '__new__'

  function openCreate() {
    setDraft({
      ...emptyForm,
      id: newId(),
      slug: '__new__',
    })
    setIngredientsText('')
  }

  function openEdit(p: Product) {
    setDraft({ ...p })
    setIngredientsText(p.ingredients.join('\n'))
  }

  function closeForm() {
    setDraft(null)
    setIngredientsText('')
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!draft) return
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    if (!name) return

    const slug = isCreate ? slugify(name) : draft.slug
    const category = String(fd.get('category') ?? 'muesli') as ProductCategory
    const tagline = String(fd.get('tagline') ?? '').trim()
    const description = String(fd.get('description') ?? '').trim()
    const image = String(fd.get('image') ?? '').trim() || '/images/muesli.svg'
    const stock = Number(fd.get('stock') ?? 0)
    const price250 = Number(fd.get('price250') ?? 0)
    const price500 = Number(fd.get('price500') ?? 0)
    const rating = Number(fd.get('rating') ?? 4.8)
    const ingredients = ingredientsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const nutrition: Product['nutrition'] = [
      { label: 'Serving', value: String(fd.get('nServing') ?? '45g') },
      { label: 'Energy', value: String(fd.get('nEnergy') ?? '—') },
    ]

    const next: Product = {
      id: draft.id,
      slug,
      name,
      category,
      tagline,
      description,
      ingredients: ingredients.length ? ingredients : ['—'],
      nutrition,
      images: [image],
      variants: [
        { grams: 250, price: price250 },
        { grams: 500, price: price500 },
      ],
      rating: Number.isFinite(rating) ? rating : 4.8,
      stock: Number.isFinite(stock) ? stock : 0,
    }
    upsertProduct(next)
    closeForm()
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-serif text-3xl text-forest">Products</h1>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-page hover:bg-brand-dark"
        >
          Add New Product
        </button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/55 bg-white/35 shadow-lg backdrop-blur-xl">
        <table className="min-w-full divide-y divide-white/40 text-left text-sm">
          <thead className="bg-white/40 text-xs font-semibold uppercase tracking-wide text-forest/55 backdrop-blur-md">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/40 bg-white/25">
            {products.map((p) => {
              const v = p.variants.find((x) => x.grams === 250) ?? p.variants[0]
              return (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-forest">{p.name}</td>
                  <td className="px-4 py-3 text-forest/75">{formatINR(v.price)}</td>
                  <td className="px-4 py-3 text-forest/75">{p.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="text-xs font-semibold text-forest underline"
                        onClick={() => openEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-xs font-semibold text-red-700 underline"
                        onClick={() => {
                          if (confirm(`Delete ${p.name}?`)) deleteProduct(p.id)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {draft ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-forest/35 p-4 backdrop-blur-sm sm:items-center">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/55 bg-white/50 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl text-forest">{isCreate ? 'Add product' : 'Edit product'}</h2>
              <button type="button" className="text-sm text-forest/60 hover:text-brand" onClick={closeForm}>
                Close
              </button>
            </div>
            <form key={draft.id} onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                Name
                <input
                  name="name"
                  defaultValue={draft.name}
                  className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                  required
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                Category
                <select
                  name="category"
                  defaultValue={draft.category}
                  className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                >
                  <option value="muesli">Muesli</option>
                  <option value="granola">Granola</option>
                  <option value="honey">Honey</option>
                </select>
              </label>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                Tagline
                <input
                  name="tagline"
                  defaultValue={draft.tagline}
                  className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                Description
                <textarea
                  name="description"
                  defaultValue={draft.description}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                Ingredients (one per line)
                <textarea
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                  Price 250g (₹)
                  <input
                    name="price250"
                    type="number"
                    min={0}
                    defaultValue={draft.variants.find((v) => v.grams === 250)?.price ?? 0}
                    className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                    required
                  />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                  Price 500g (₹)
                  <input
                    name="price500"
                    type="number"
                    min={0}
                    defaultValue={draft.variants.find((v) => v.grams === 500)?.price ?? 0}
                    className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                    required
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                  Stock
                  <input
                    name="stock"
                    type="number"
                    min={0}
                    defaultValue={draft.stock}
                    className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                    required
                  />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                  Rating
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min={0}
                    max={5}
                    defaultValue={draft.rating}
                    className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                  />
                </label>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                Image URL or path
                <input
                  name="image"
                  defaultValue={draft.images[0]}
                  className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                />
              </label>
              <p className="text-xs text-forest/55">Upload sets the image field to a local data URL (demo only).</p>
              <input
                type="file"
                accept="image/*"
                className="text-xs text-forest/80"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () => {
                    const url = String(reader.result ?? '')
                    const formEl = (e.target as HTMLInputElement).form
                    const input = formEl?.querySelector('input[name="image"]') as HTMLInputElement | null
                    if (input) input.value = url
                  }
                  reader.readAsDataURL(file)
                }}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                  Nutrition — serving
                  <input
                    name="nServing"
                    defaultValue={draft.nutrition[0]?.value ?? '45g'}
                    className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                  />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-wide text-forest/55">
                  Nutrition — energy
                  <input
                    name="nEnergy"
                    defaultValue={draft.nutrition[1]?.value ?? '—'}
                    className="mt-2 w-full rounded-xl border border-white/55 bg-white/40 px-3 py-2 text-sm text-forest backdrop-blur-sm"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand py-3 text-sm font-semibold text-page hover:bg-brand-dark"
              >
                Save product
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
