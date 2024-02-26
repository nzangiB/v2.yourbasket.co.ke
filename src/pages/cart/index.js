import { Cart } from "./cart/cart";
import { CartCoupon } from "./cartCoupon/cartCoupon";

export default [
  {
    path: "/cart",
    template: Cart
  },
  {
    path: "/cart/coupon",
    template: CartCoupon
  }
];
