import { Checkout } from "./checkout/checkout";
import { CheckoutAddress } from "./checkoutAddress/checkoutAddress";
import { CheckoutPayNow } from "./checkoutPayment/payNow";
import { CheckoutPayOnDelivery } from "./checkoutPayment/payOnDelivery";
import { CheckoutPayPartial } from "./checkoutPayment/payPartial/checkoutPayPartial";
import { CheckoutPayLater } from "./checkoutPayment/payLater/checkoutPayLater";
import { CheckoutEdit } from "./checkoutEdit/checkoutEdit";
import { CheckoutDelivery } from "./checkoutDelivery/checkoutDelivery";
import { CheckoutDisabled } from "./checkoutDisabled/checkoutDisabled";

export default {
  checkoutRoute: {
    path: "/checkout",
    template: Checkout
  },
  checkoutAddressRoute: {
    path: "/checkout/address",
    template: CheckoutAddress
  },
  checkoutPaymentRoute: {
    path: "/checkout/payment",
    template: (props) => {
      const { option } = props.query;
      // "/checkout/payment?option=payNow"
      if (option === "payNow") return CheckoutPayNow(props);
      // "/checkout/payment?option=payOnDelivery"
      if (option === "payOnDelivery") return CheckoutPayOnDelivery(props);
      // "/checkout/payment?option=payPartial"
      if (option === "payPartial") return CheckoutPayPartial(props);
      // "/checkout/payment?option=payLater"
      if (option === "payLater") return CheckoutPayLater(props);
      // "/checkout/payment?option=other"
      return "Unsupported Payment Option";
    }
  },
  checkoutEditRoute: {
    path: "/checkout/edit",
    template: CheckoutEdit
  },
  checkoutDisabledRoute: {
    path: "/checkout/disabled",
    template: CheckoutDisabled
  },
  checkoutDeliveryRoute: {
    path: "/checkout/delivery",
    template: CheckoutDelivery
  }
};
