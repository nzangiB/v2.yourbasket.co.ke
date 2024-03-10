import { defaults, Router } from "@wearearchangel/handcrafted";

// plugins
import { reportWebVitals } from "../plugins/reportWebVitals";
import { updateViewport } from "../plugins/updateViewport";

// layout
import { Layout } from "./layout";

// routes
import Home from "../pages/home/home";
import Product from "../pages/product/product";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Categories from "../pages/categories/categories";
import Login from "../pages/login";
import Register from "../pages/register";
import Account from "../pages/account/account";

// initialize defaults
defaults.templateEngine = "react";
defaults.layout = Layout;

const routes = [
  /**
	 * 01 Home
	 * .0 Landing Page
	 * .1 Landing Page [Search]
	 */
  {
    path: "/",
    data: { page: { title: "Online Shopping for Furniture, Appliances & More!" } },
    template: Home
  },
  /**
	 * 02 - Product
	 * .0 Product Page > Tab > Product Overview
	 * .1 Product Page > Tab > Product Reviews
	 * .2 Product Page > Tab > More Images [No Images]
	 * .3 Product Page > Tab > More Images [Carousel]
	 * .4 Product Page > Modal > Offers Available [Card List]
	 * .5 Product Page > Modal > Offers Available [Card Selected]
	 */
  {
    path: "/product",
    data: { page: { title: "Product" } },
    template: Categories
  },
  {
    path: "/product/search/:keyword?",
    data: { page: { title: "Product by Search" } },
    template: Categories
  },
  {
    path: "/product/brand/:brand?",
    data: { page: { title: "Product by Brand" } },
    template: Categories
  },
  {
    path: "/product/filter/:filter?",
    data: { page: { title: "Product by Filter" } },
    template: Categories
  },
  {
    path: "/product/:id",
    data: { page: { title: "Product by Id" } },
    template: Product
  },
  /**
	 * 03
	 * .0 Aspira Inactive
	 * .1 Aspira Active
	 * .2 Aspira Check Credit [Start]
	 * .3 Aspira Check Credit [Input Number]
	 * .4 Aspira Check Credit [Success]
	 * .5 Aspira Check Credit [Error]
	 * .6 Aspira Apply for Financing
	 */
  /**
	 * 04 - Cart
	 * .0 Cart Page
	 * .1 Cart Page [Coupon]
	 */
  ...Cart,
  /**
	 * 05 - Checkout
	 * .0 Checkout Page
	 * .1 Checkout Page [Address]
	 * .2 Checkout Page [Delivery - Door]
	 * .3 Checkout Page [Delivery - Pickup]
	 * .4 Checkout Page [Pay Now With Ipay]
	 * .5 Checkout Page [Pay Now With Mpesa]
	 * .6 Checkout Page [Pay On Delivery With Mpesa]
	 * .7 Checkout Page [Partial Payment]
	 * .8 Checkout Page [Buy Now Pay Later]
	 * .9 Checkout Page [Edit]
	 * .10 Checkout Page [Subscribe Disabled]
	 */
  ...Checkout,
  /**
	 * 06 TODO Categories
	 * .0 Category [Hover]
	 * .1 Category [Click View]
	 * .2 Category [Click Filter View]
	 * .3 Category [Click Subcategory View]
	 */
  {
    path: "/categories{/:master}?{/:category}?{/:subcategory}?",
    data: { page: { title: "Subcategory" } },
    template: Categories
  },
  {
    path: "/categories/:master/:category/:subcategory/:id",
    data: { page: { title: "Category ID" } },
    template: Product
  },
  //  {
  //    path: "/brands/:brand?",
  //    data: {page: {title: 'Brand'}},
  //    template: Brands
  //  },
  {
    path: "/login",
    data: { page: { title: "Login" } },
    template: Login
  },
  {
    path: "/register{/:page}?",
    data: { page: { title: "Register" } },
    template: Register
  },
  ...Account,
  {
    path: "/support",
    data: { page: { title: "Support and Help" } },
    template: (props) => (
      <Layout {...props}>
				Support and Help
      </Layout>
    )
  },
  {
    path: "/404",
    data: { page: { title: "Page Not Found" } },
    template: (props) => (
      <Layout {...props}>
        <div>
          <h1>404</h1>
          <p>Page Not Found</p>
        </div>
      </Layout>
    )
  }
];

Router(routes).then(() => {
  addEventListener("load", reportWebVitals, false);
  addEventListener("load", updateViewport, false);
  addEventListener("resize", updateViewport, false);
  addEventListener("orientationchange", updateViewport, false);
});
