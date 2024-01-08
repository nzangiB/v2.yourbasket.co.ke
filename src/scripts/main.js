import { Router } from '@wearearchangel/handcrafted';

import { Home } from '../pages/home/home';
import { ProductPage } from '../pages/productPage/productPage';
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";

Router({
  home: {
    path: '/',
    template: Home
  },
  productPageRoute: {
    path: '/product/:id',
    template: ProductPage
  },
  ...Cart,
  ...Checkout
});
