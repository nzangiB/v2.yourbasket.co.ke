import { CheckoutWithMpesa } from "./checkoutWithMpesa";

export function CheckoutPayOnDelivery (props) {
  const { method } = props.query;

  if (method === "mpesa") return CheckoutWithMpesa;
  return "Unsupported Payment Option";
}
