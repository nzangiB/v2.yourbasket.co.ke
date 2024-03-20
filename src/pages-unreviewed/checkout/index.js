import { Checkout } from "./checkout/checkout";
import { CheckoutAddress } from "./checkoutAddress/checkoutAddress";
import { CheckoutPayNow } from "./checkoutPayment/payNow";
import { CheckoutPayOnDelivery } from "./checkoutPayment/payOnDelivery";
import { CheckoutPayPartial } from "./checkoutPayment/payPartial/checkoutPayPartial";
import { CheckoutPayLater } from "./checkoutPayment/payLater/checkoutPayLater";
import { CheckoutEdit } from "./checkoutEdit/checkoutEdit";
import { CheckoutDelivery } from "./checkoutDelivery/checkoutDelivery";
import { CheckoutDisabled } from "./checkoutDisabled/checkoutDisabled";

export default [
  {
    path: "/checkout",
    template: Checkout
  },
  {
    path: "/checkout/address",
    template: CheckoutAddress
  },
  {
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
  {
    path: "/checkout/edit",
    template: CheckoutEdit
  },
  {
    path: "/checkout/disabled",
    template: CheckoutDisabled
  },
  {
    path: "/checkout/delivery",
    template: CheckoutDelivery
  }
];
