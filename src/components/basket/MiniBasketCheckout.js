import OrderList from "./OrderList";
import OrderSummary from "./OrderSummary";
import PaymentMethodsListDetailed from "./PaymentMethodsListDetailed";

import "./MiniBasketCheckout.scss";

async function MiniBasketCheckout (props) {
  const { cart, setStep } = props;

  const cartExists = (await cart()).length;

  return (
    <section className="mini-basket__checkout">
      <div className={"order"}>
        <OrderList setStep={setStep} getCart={cart} disabled={true} editable={true}/>
        {cartExists && <OrderSummary getCart={cart}/>}
      </div>

      {cartExists && (
        <div className={"payment"}>
          <div className="payment__methods">
            <div className="payment__methods-title">
              <div className="title">Payment</div>
            </div>
            <PaymentMethodsListDetailed {...props}/>
          </div>
        </div>
      )}
    </section>
  );
}

export default MiniBasketCheckout;
