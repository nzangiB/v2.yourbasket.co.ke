import Products from "../../pages/products/products";
import Product from "../../pages/products/product";

const routes = [
  {
    path: "/:master{/:category}?{/:subcategory}?",
    data: { page: { title: "Products by Category" } },
    template: Products
  },
  {
    path: "/:master/:category/:subcategory/:id",
    data: { page: { title: "Product by Id" } },
    template: Product
  }
];

export default routes;
