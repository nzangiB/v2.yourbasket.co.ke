import { defaults, Router } from "@wearearchangel/handcrafted";

// plugins
import { reportWebVitals } from "../plugins/reportWebVitals";
import { updateViewport } from "../plugins/updateViewport";

// layout
import { Layout } from "./layout";

// routes
import Home from "../pages/home/home";
import ProductPage from "../pages/productPage/productPage";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import Categories from "../pages/categories/categories";
import Register from "../pages/account/register";
import Login from "../pages/account/login";

// initialize defaults
defaults.templateEngine = "react";
defaults.layout = Layout;

Router([
  /**
	 * 01 Home
	 * .0 Landing Page
	 * .1 Landing Page [Search]
	 */
  {
    path: "/",
    data: { page: { title: "Home" } },
    template: Home,
    controller: () => {
      const Flickity = window.Flickity;
      const carousels = document.querySelectorAll(".carousel");
      for (const carousel of carousels) {
        new Flickity(carousel, {
          autoPlay: true,
          // arrowShape: "M0.749603 9.44518C0.821801 9.51929 1.09441 9.83618 1.34835 10.0968C2.83712 11.7362 6.72086 14.4196 8.75361 15.2386C9.06231 15.3702 9.8428 15.6488 10.2598 15.6667C10.6594 15.6667 11.0403 15.5747 11.4038 15.3881C11.8569 15.1275 12.2203 14.7173 12.4195 14.233C12.5477 13.897 12.7469 12.8913 12.7469 12.8735C12.9461 11.7733 13.0556 9.98568 13.0556 8.01023C13.0556 6.12807 12.9461 4.41329 12.783 3.29651C12.7643 3.27862 12.5652 2.02895 12.3473 1.6009C11.9477 0.818899 11.1673 0.333344 10.332 0.333344H10.2598C9.71583 0.35251 8.57187 0.838066 8.57187 0.855955C6.64867 1.67629 2.85454 4.22801 1.32968 5.92362C1.32968 5.92362 0.900223 6.35934 0.713504 6.63151C0.422223 7.02251 0.277828 7.50679 0.277828 7.99107C0.277828 8.53157 0.440895 9.03501 0.749603 9.44518",
          cellAlign: "left",
          // imagesLoaded: true,
          // percentagePosition: true,
          lazyLoad: true,
          contain: true
          // prevNextButtons: true,
          // pageDots: false
          // watchCSS: true
        });
      }
    }
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
    template: ProductPage
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
    template: ProductPage
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
    path: "/register",
    data: { page: { title: "Register" } },
    template: Register
  }
], () => {
  // addEventListener('load', reportWebVitals, false);
  // addEventListener('load', updateViewport, false);
  // addEventListener('resize', updateViewport, false);
  // addEventListener('orientationchange', updateViewport, false);
});

addEventListener("load", reportWebVitals, false);
addEventListener("load", updateViewport, false);
addEventListener("resize", updateViewport, false);
addEventListener("orientationchange", updateViewport, false);
