'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImagePlus, Save } from 'lucide-react';

import FormInput from '@/components/form/FormInput';
import SelectInput from '@/components/form/SelectInput';
import TextArea from '@/components/form/TextArea';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import { WINE_CATEGORIES } from '@/data/products';

const TYPE_OPTIONS = WINE_CATEGORIES.filter((category) => category.slug !== 'all').map(
  (category) => ({ value: category.slug, label: category.label }),
);

const AVAILABILITY_OPTIONS = [
  { value: 'In Stock', label: 'In Stock' },
  { value: 'Low Stock', label: 'Low Stock' },
  { value: 'Sold Out', label: 'Sold Out' },
];

const BLANK = {
  name: '',
  typeSlug: TYPE_OPTIONS[0].value,
  description: '',
  image: '',
  price: '',
  stock: '',
  availability: 'In Stock',
  volume: '750ml',
  alcohol: '',
  origin: 'Avissawella, Sri Lanka',
  vintage: '',
  sweetness: 50,
  acidity: 50,
  body: 50,
  fruitiness: 50,
  ingredients: '',
  servingSuggestions: '',
};

/**
 * Add / edit product form.
 *
 * Pass an existing `product` to edit it, or omit it to create a new one. There
 * is no backend, so saving validates and confirms — replace the body of
 * `handleSubmit` with the API call when one exists.
 */
export default function ProductForm({ product }) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [values, setValues] = useState(
    product
      ? {
          name: product.name,
          typeSlug: product.typeSlug,
          description: product.description,
          image: product.image,
          price: String(product.price),
          stock: String(product.stock),
          availability: product.availability,
          volume: product.volume,
          alcohol: product.alcohol,
          origin: product.origin,
          vintage: product.vintage,
          sweetness: product.flavour.sweetness,
          acidity: product.flavour.acidity,
          body: product.flavour.body,
          fruitiness: product.flavour.fruitiness,
          ingredients: product.ingredients,
          servingSuggestions: product.servingSuggestions.foodPairings,
        }
      : BLANK,
  );
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = 'A product name is required.';
    if (!values.description.trim()) next.description = 'Add a short description.';
    if (!(Number(values.price) > 0)) next.price = 'Enter a price greater than zero.';
    if (values.stock === '' || Number(values.stock) < 0) next.stock = 'Enter a stock quantity.';
    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      document.querySelector('.vint-field--invalid input, .vint-field--invalid textarea')?.focus();
      return;
    }

    setToast(isEdit ? `${values.name} saved.` : `${values.name} added to the collection.`);
  }

  return (
    <>
      <form className="vint-admin-form" onSubmit={handleSubmit} noValidate>
        {/* ---------- Basic information ---------- */}
        <fieldset className="vint-fieldset">
          <legend className="vint-fieldset__legend">Basic Information</legend>
          <div className="vint-form-grid">
            <FormInput
              label="Product Name"
              value={values.name}
              onChange={update('name')}
              error={errors.name}
              required
            />
            <SelectInput
              label="Wine Type"
              value={values.typeSlug}
              onChange={update('typeSlug')}
              options={TYPE_OPTIONS}
            />
            <TextArea
              label="Description"
              rows={3}
              className="vint-form-grid__full"
              value={values.description}
              onChange={update('description')}
              error={errors.description}
              required
            />
          </div>
        </fieldset>

        {/* ---------- Product image ---------- */}
        <fieldset className="vint-fieldset">
          <legend className="vint-fieldset__legend">Product Image</legend>
          <p className="vint-fieldset__hint">
            Bottle photographs work best on a plain background, at least 800px tall.
          </p>

          <div className="vint-upload">
            <span className="vint-upload__preview">
              {values.image ? (
                <Image src={values.image} alt="" width={84} height={104} />
              ) : (
                <ImagePlus size={26} aria-hidden="true" color="var(--vint-text-faint)" />
              )}
            </span>

            <div style={{ flex: 1 }}>
              <FormInput
                label="Image Path"
                value={values.image}
                onChange={update('image')}
                placeholder="/images/wines/your-wine.png"
              />
            </div>
          </div>
        </fieldset>

        {/* ---------- Price & inventory ---------- */}
        <fieldset className="vint-fieldset">
          <legend className="vint-fieldset__legend">Price &amp; Inventory</legend>
          <div className="vint-form-grid">
            <FormInput
              label="Price (Rs.)"
              type="number"
              min="0"
              step="50"
              value={values.price}
              onChange={update('price')}
              error={errors.price}
              required
            />
            <FormInput
              label="Stock Quantity"
              type="number"
              min="0"
              value={values.stock}
              onChange={update('stock')}
              error={errors.stock}
              required
            />
            <SelectInput
              label="Availability"
              value={values.availability}
              onChange={update('availability')}
              options={AVAILABILITY_OPTIONS}
            />
          </div>
        </fieldset>

        {/* ---------- Wine details ---------- */}
        <fieldset className="vint-fieldset">
          <legend className="vint-fieldset__legend">Wine Details</legend>
          <div className="vint-form-grid">
            <FormInput label="Volume" value={values.volume} onChange={update('volume')} />
            <FormInput
              label="Alcohol %"
              value={values.alcohol}
              onChange={update('alcohol')}
              placeholder="12.5%"
            />
            <FormInput label="Origin" value={values.origin} onChange={update('origin')} />
            <FormInput
              label="Vintage"
              value={values.vintage}
              onChange={update('vintage')}
              placeholder="2023"
            />
          </div>
        </fieldset>

        {/* ---------- Flavour profile ---------- */}
        <fieldset className="vint-fieldset">
          <legend className="vint-fieldset__legend">Flavour Profile</legend>
          <p className="vint-fieldset__hint">
            These percentages drive the animated bars on the product page.
          </p>

          <div className="vint-form-grid">
            {['sweetness', 'acidity', 'body', 'fruitiness'].map((key) => (
              <FormInput
                key={key}
                label={`${key.charAt(0).toUpperCase()}${key.slice(1)} %`}
                type="number"
                min="0"
                max="100"
                value={values[key]}
                onChange={update(key)}
              />
            ))}
          </div>
        </fieldset>

        {/* ---------- Additional information ---------- */}
        <fieldset className="vint-fieldset">
          <legend className="vint-fieldset__legend">Additional Information</legend>
          <div className="vint-form-grid">
            <TextArea
              label="Ingredients &amp; Origin"
              rows={3}
              className="vint-form-grid__full"
              value={values.ingredients}
              onChange={update('ingredients')}
            />
            <TextArea
              label="Serving Suggestions"
              rows={3}
              className="vint-form-grid__full"
              value={values.servingSuggestions}
              onChange={update('servingSuggestions')}
            />
          </div>
        </fieldset>

        <div className="vint-admin-actions">
          <Button variant="outline" square onClick={() => router.push('/admin/products')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" square icon={<Save size={16} />}>
            Save Product
          </Button>
        </div>
      </form>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </>
  );
}
