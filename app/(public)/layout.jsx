import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/**
 * Chrome shared by every public page.
 *
 * This is a Next.js route group — the "(public)" folder name is not part of any
 * URL, it just lets the public pages share a navbar and footer while /admin
 * uses a completely different shell.
 */
export default function PublicLayout({ children }) {
  return (
    <>
      <a className="vint-skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
