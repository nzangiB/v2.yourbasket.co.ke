import { Cart } from './cart/cart';
import { CartCoupon } from './cartCoupon/cartCoupon';

export default {
  cartRoute: {
    path: '/cart',
    template: Cart
  },
  cartCouponRoute: {
    path: '/cart/coupon',
    template: CartCoupon
  }
};
