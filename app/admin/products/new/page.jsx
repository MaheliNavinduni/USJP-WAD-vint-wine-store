import AdminHeader from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';

export const metadata = { title: 'Add Product' };

export default function AdminNewProductPage() {
  return (
    <>
      <AdminHeader
        title="Add Product"
        subtitle="Add a new wine to the VINT collection."
        backHref="/admin/products"
        backLabel="Back to products"
      />

      <ProductForm />
    </>
  );
}
