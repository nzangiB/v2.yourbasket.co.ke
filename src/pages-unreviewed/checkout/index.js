import { Checkout } from "./checkout/checkout";
import { CheckoutAddress } from "./checkoutAddress/checkoutAddress";
import { CheckoutPayNow } from "./checkoutPayment/payNow";
import { CheckoutPayOnDelivery } from "./checkoutPayment/payOnDelivery";
import { CheckoutPayPartial } from "./checkoutPayment/payPartial/checkoutPayPartial";
import { CheckoutPayLater } from "./checkoutPayment/payLater/checkoutPayLater";
import { CheckoutEdit } from "./checkoutEdit/checkoutEdit";
import { CheckoutDelivery } from "./checkoutDelivery/checkoutDelivery";
import { CheckoutDisabled } from "./checkoutDisabled/checkoutDisabled";

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
