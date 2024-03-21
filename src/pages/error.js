import Layout from "./_layout";

import "./error.scss";

function Error404 (props) {
  return (
    <Layout {...props}>
      <div>
        <h1 className={"title"}>Error</h1>
        <p>Page Not Found</p>
      </div>
    </Layout>
  );
}

const routes = [
  {
    path: "/404",
    data: { page: { title: "Page Not Found" } },
    template: Error404
  }
];

export default routes;
