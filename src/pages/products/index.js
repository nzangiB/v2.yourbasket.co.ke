import Layout from "./_layout";
import Products from "./products";
import Product from "./product";

import "./account.scss";

const routes = [
  {
    path: "/products",
    data: { page: { title: "Product" } },
    template: (props) => (
      <Layout {...props}>
        <Products {...props}/>
      </Layout>
    )
  },
  {
    path: "/products/search/:keyword?",
    data: { page: { title: "Products by Search" } },
    template: (props) => (
      <Layout {...props}>
        <Products {...props}/>
      </Layout>
    )
  },
  {
    path: "/products/brand/:brand?",
    data: { page: { title: "Products by Brand" } },
    template: (props) => (
      <Layout {...props}>
        <Products {...props}/>
      </Layout>
    )
  },
  {
    path: "/products/filter/:filter?",
    data: { page: { title: "Products by Filter" } },
    template: (props) => (
      <Layout {...props}>
        <Products {...props}/>
      </Layout>
    )
  },
  // {
  // 	path: '/products/:id',
  // 	data: { page: { title: 'Products by Id' } },
  // 	template: (props) => (
  // 		<Layout {...props}>
  // 			<Product {...props}/>
  // 		</Layout>
  // 	)
  // },
  {
    path: "/categories{/:master}?{/:category}?{/:subcategory}?",
    data: { page: { title: "Products by Category" } },
    template: (props) => (
      <Layout {...props}>
        <Products {...props}/>
      </Layout>
    )
  },
  {
    path: "/categories/:master/:category/:subcategory/:id",
    data: { page: { title: "Product" } },
    template: (props) => (
      <Layout {...props}>
        <Product {...props}/>
      </Layout>
    )
  }
];

export default routes;
