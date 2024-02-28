import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

export function Layout () {
  return (
    <>
      <Header/>
      <main className="page"></main>
      <Footer/>
    </>
  );
}
