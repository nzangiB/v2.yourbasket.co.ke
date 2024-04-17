import RootLayout from "../../pages/_layout";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";

function Layout (props, children) {
  return (
    <RootLayout>
      <Header {...props}/>
      <div className="container">
        <main className="content">
          {children}
        </main>
      </div>
      <Footer/>
    </RootLayout>
  );
}

export default Layout;
