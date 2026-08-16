import AdminHeader from '@/components/admin/AdminHeader';
import OrdersTable from '@/components/admin/OrdersTable';
import { getOrderStats } from '@/data/orders';

export const metadata = { title: 'Orders' };

export default function AdminOrdersPage() {
  const stats = getOrderStats();

  return (
    <>
      <AdminHeader
        title="Orders"
        subtitle={`${stats.total} orders received · ${stats.pending} awaiting confirmation.`}
      />

      <OrdersTable />
    </>
  );
}
