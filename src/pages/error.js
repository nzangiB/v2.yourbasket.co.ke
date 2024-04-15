import Layout from "./_layout";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

import "./error.scss";

function Error404 (props) {
  return (
    <Layout {...props}>
      <Header {...props}/>
      <div className="container">
        <main className="content" style={{
          display: "flex",
          placeContent: "center",
          textAlign: "center",
          padding: "20px"
        }}>
          <div className="error">
            <h1 className={"title"}>Error</h1>
            <p>Page Not Found</p>
          </div>
        </main>
      </div>
      <Footer/>
    </Layout>
  );
}

const routes = [
  {
    path: "/*",
    data: { page: { title: "Page Not Found" } },
    template: Error404
  }
];

export default routes;
