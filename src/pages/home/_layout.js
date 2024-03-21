import RootLayout from "../_layout";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";

function Layout (props, children) {
  return (
    <RootLayout>
      <Header {...props}/>
      {children}
      <Footer/>
    </RootLayout>
  );
}

export default Layout;
