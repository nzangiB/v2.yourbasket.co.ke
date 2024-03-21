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
    path: "/products",
    data: { page: { title: "Product" } },
    template: Products
  },
  {
    path: "/products/search/:keyword?",
    data: { page: { title: "Products by Search" } },
    template: Products
  },
  {
    path: "/products/brand/:brand?",
    data: { page: { title: "Products by Brand" } },
    template: Products
  },
  {
    path: "/products/filter/:filter?",
    data: { page: { title: "Products by Filter" } },
    template: Products
  },
  // {
  // 	path: '/products/:id',
  // 	data: { page: { title: 'Products by Id' } },
  // 	template: Product
  // },
  {
    path: "/categories{/:master}?{/:category}?{/:subcategory}?",
    data: { page: { title: "Products by Category" } },
    template: Products
  },
  {
    path: "/categories/:master/:category/:subcategory/:id",
    data: { page: { title: "Product" } },
    template: Product
  }
  //  {
  //    path: "/brands/:brand?",
  //    data: {page: {title: 'Brand'}},
  //    template: Brands
  //  },
];

export default routes;
