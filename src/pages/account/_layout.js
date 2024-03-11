import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";

export function Layout (props, children) {
  return (
    <>
      <Header {...props}/>
      <div className="container">
        <main className="content">
          {children}
        </main>
      </div>
      <Footer/>
    </>
  );
}
