import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: {
    default: 'Admin',
    template: '%s | VINT Admin',
  },
  robots: { index: false, follow: false },
};

/**
 * Admin shell — dark sidebar, cream content area.
 *
 * There is no authentication in this project by design, so these screens are
 * the management frontend only. Access control belongs to the backend when it
 * is added.
 */
export default function AdminLayout({ children }) {
  return (
    <div className="vint-admin">
      <AdminSidebar />
      <main className="vint-admin-main">{children}</main>
    </div>
  );
}
