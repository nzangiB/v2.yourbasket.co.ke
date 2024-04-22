import Products from "./products";
import Product from "./product";

/**
 * 02 - Product
 * .0 Product Page > Tab > Product Overview
 * .1 Product Page > Tab > Product Reviews
 * .2 Product Page > Tab > More Images [No Images]
 * .3 Product Page > Tab > More Images [Carousel]
 * .4 Product Page > Modal > Offers Available [Card List]
 * .5 Product Page > Modal > Offers Available [Card Selected]
 */
const routes = [
  {
    // path: "/#/product/search/:keyword?",
    path: "/search/:keyword?",
    data: { page: { title: "Products by Search" } },
    template: Products
  },
  {
    // path: "/#/product",
    path: "/products{/}?",
    data: { page: { title: "All Products" } },
    template: Products
  },
  {
    // path: "/#/product/brand/:brand?",
    path: "/products/brands/:brand?",
    data: { page: { title: "Products by Brand" } },
    template: Products
  },
  {
    // path: "/#/product/filter/:filter?",
    path: "/products/filter/:filter?",
    data: { page: { title: "Products by Filter" } },
    template: Products
  },
  {
    // path: "/#/compare/:id?",
    path: "/products/compare/:id?",
    data: { page: { title: "Products by Comparison" } },
    template: "Compare"
  },
  {
    // path: "/#/:master{/:category}?{/:subcategory}?",
    path: "/products/:master{/:category}?{/:subcategory}?",
    data: { page: { title: "Products by Category" } },
    template: Products
  },
  {
    // path: "/#/:master/:category/:subcategory/:id",
    path: "/products/:master/:category/:subcategory/:id",
    data: { page: { title: "Product by Id" } },
    template: Product
  }
];

export default routes;
