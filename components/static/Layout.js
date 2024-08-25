import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      <Navigation />
      <main className={"layout-content grow pb-20"}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
