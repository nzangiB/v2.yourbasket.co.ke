import { OrderList } from "./OrderList";
import { OrderSummary } from "./OrderSummary";
import { PaymentMethods } from "./PaymentMethods";

import "./MiniBasketEdit.scss";

export function MiniBasketEdit ({ getCart, setStep }) {
  const checkoutNowEvent = (e) => {
    setStep("checkout");
  };

  const checkoutLaterEvent = (e) => {
    setStep("checkout-later");
  };

  return (
    <section className="mini-basket__edit">
      <OrderList getCart={getCart} disabled={false}/>

      <section className="payment">
        <PaymentMethods/>
        <OrderSummary getCart={getCart}/>
      </section>

      <section className="btn-group">
        <button className="btn --primary" onClick={checkoutNowEvent}>
          <span>Checkout Now</span>
        </button>
        <div className="text">
          <span>or</span>
        </div>
        <button className="btn --secondary" disabled={true} onClick={checkoutLaterEvent}>
          <object data={require("./icons/calendar.svg")} name={"Checkout Later"}/>
          <span>Checkout Later</span>
        </button>
      </section>
    </section>
  );
}
