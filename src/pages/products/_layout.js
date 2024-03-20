import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";

function Layout (props, children) {
  return (
    <>
      <Header {...props}/>
      {children}
      <Footer/>
    </>
  );
}

export default Layout;
