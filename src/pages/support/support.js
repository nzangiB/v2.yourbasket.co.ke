import Layout from "./_layout";

import "./support.scss";

const routes = [
  {
    path: "/support",
    data: { page: { title: "Support and Help" } },
    template: (props) => (
      <Layout {...props}>
        <h1 className={"title"}>Support and Help</h1>
      </Layout>
    )
  }
];

export default routes;
