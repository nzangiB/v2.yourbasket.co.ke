import { Router } from "@wearearchangel/handcrafted";
import { Home } from "../pages/Home";
import { productPage } from "../pages/productPage";
import { Cart } from "../pages/cart/cart";
import { CartCoupon } from "../pages/cart/cartCoupon";
import { Checkout } from "../pages/checkout/checkout";
import { CheckoutAddress } from "../pages/checkout/checkoutAddress";
import { CheckoutIpay } from "../pages/checkout/ipay/checkoutIpay";
import { CheckoutMpesa } from "../pages/checkout/mpesa/checkoutMpesa";
import { MpesaDelivery } from "../pages/checkout/mpesaDelivery/mpesaDelivery";
import { partialPay } from "../pages/checkout/partialpay/partialPay";
import { payLater } from "../pages/checkout/payLater/payLater";
import { checkoutEdit } from "../pages/checkout/checkoutEdit/checkoutEdit";

Router({
  home: {
    path: '/',
    async template (props) {
      return `
        ${await Home(props)}
      `
    },
  },

  productPageRoute: {
    path: '/productpage',
    async template (props) {
      return `
        ${await productPage(props)}
      `
    },
  },

  cartRoute: {
    path: '/cart',
    async template (props) {
      return `
        ${await Cart(props)}
      `
    },
  },

  cartCouponRoute: {
    path: '/cartcoupon',
    async template (props) {
      return `
        ${await CartCoupon(props)}
      `
    },
  },

  checkoutRoute: {
    path: '/checkout',
    async template (props) {
      return `
        ${await Checkout(props)}
      `
    },
  },

  checkoutAddressRoute: {
    path: '/checkoutaddress',
    async template (props) {
      return `
        ${await CheckoutAddress(props)}
      `
    },
  },

  checkoutIpayRoute: {
    path: '/checkoutIpay',
    async template (props) {
      return `
        ${await CheckoutIpay(props)}
      `
    },
  },

  checkoutMpesaRoute: {
    path: '/checkoutmpesa',
    async template (props) {
      return `
        ${await CheckoutMpesa(props)}
      `
    },
  },

  MpesaDeliveryRoute: {
    path: '/mpesadelivery',
    async template (props) {
      return `
        ${await MpesaDelivery(props)}
      `
    },
  },

  partialPayRoute: {
    path: '/partialpay',
    async template (props) {
      return `
        ${await partialPay(props)}
      `
    },
  },

  payLaterRoute: {
    path: '/paylater',
    async template (props) {
      return `
        ${await payLater(props)}
      `
    },
  },

  checkoutEditRoute: {
    path: '/checkoutedit',
    async template (props) {
      return `
        ${await checkoutEdit(props)}
      `
    },
  },

  checkoutDisabledRoute: {
    path: '/checkoutdisabled',
    async template (props) {
      return `
        ${await checkoutDisabled(props)}
      `
    },
  },

});
