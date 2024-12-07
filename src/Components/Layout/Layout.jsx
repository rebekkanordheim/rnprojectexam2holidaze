import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout component that defines the overall layout structure of the application.
 * It includes a header and footer component, and a main content area for nested content.
 * The `children` prop allows the passing of nested components to be rendered in the main content area.
 *
 * @param {Object} props - The props for the Layout component.
 * @param {JSX.Element} props.children - The child elements to be rendered inside the layout.
 * @returns {JSX.Element} The rendered Layout component.
 */
function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
