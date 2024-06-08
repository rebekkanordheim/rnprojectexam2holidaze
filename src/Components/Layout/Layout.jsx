import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout component that defines the overall layout structure of the application.
 * It includes a header and footer component.
 *
 * @returns {JSX.Element} The rendered Layout component.
 */
function Layout() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
export default Layout;
