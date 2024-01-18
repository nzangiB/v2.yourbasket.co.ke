import { Router } from '@wearearchangel/handcrafted';

import { Home } from '../pages/home/home';
import { ProductPage } from '../pages/productPage/productPage';
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
// import Categories from "../pages/categories";

Router({
  /**
   * 01 Home
   * .0 Landing Page
   * .1 Landing Page [Search]
   */
  homeRoute: {
    path: '/',
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
  productPageRoute: {
    path: '/product/:id',
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
  ...Checkout
  /**
   * 06 TODO Categories
   * .0 Category [Hover]
   * .1 Category [Click View]
   * .2 Category [Click Filter View]
   * .3 Category [Click Subcategory View]
   */
  // ...Categories
});
