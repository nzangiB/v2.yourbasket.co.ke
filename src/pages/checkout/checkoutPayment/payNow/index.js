import { CheckoutWithIpay } from './checkoutWithIpay';
import { CheckoutWithMpesa } from './checkoutWithMpesa';

export function CheckoutPayNow (props) {
  const { method } = props.query;

  if (method === 'ipay') return CheckoutWithIpay;
  if (method === 'mpesa') return CheckoutWithMpesa;
  return 'Unsupported Payment Option';
}
