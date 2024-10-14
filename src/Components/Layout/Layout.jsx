import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout component that defines the overall layout structure of the application.
 * It includes a header and footer component, and a main content area for nested content.
 *
 * @returns {JSX.Element} The rendered Layout component.
 */
function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;