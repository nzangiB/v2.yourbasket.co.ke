import { useEffect } from "react";

import OrderList from "../Orders/OrderList";
import OrderDetails from "../Orders/OrderDetails";
import DeliveryDetails from "../Delivery/DeliveryDetails";
import PaymentDetails from "../Payments/PaymentDetails";
import DeliveryTracker from "../Delivery/DeliveryTracker";

import "./MiniBasketReceipt.scss";

function MiniBasketReceipt ({ cart, step, setStep, ...props }) {
  useEffect(() => {
    const component = document.getElementById(props.id);
    const scrollable = component?.querySelector(".mini-basket");
    if (scrollable) scrollable.scrollTop = 0;
  }, [step]);

  const continueShoppingEvent = () => {
    setStep(undefined);
  };

  const cancelOrderEvent = (e) => {

  };

  const printReceiptEvent = (e) => {

  };

  return (
    <section className="mini-basket__receipt">
      <div className="message" data-status={"success"}>
        <h3 className="title">Thank you</h3>
        <p className="text">Your order has been placed successfully</p>
      </div>

      <header className={"header"}>
        <button className={"btn --primary"} onClick={continueShoppingEvent}>
          <span>Continue Shopping</span>
        </button>
        <div className="btn-group">
          <button disabled={true} className={"btn --link"} onClick={cancelOrderEvent}>
            <span>Cancel Order</span>
          </button>
          <button disabled={true} className={"btn --secondary"} onClick={printReceiptEvent}>
            {/* <object data={require('./icons/print.svg')} name={'Print Receipt'}/> */}
            <span>Print Receipt</span>
          </button>
        </div>
      </header>

      {/* <section className={"card-group"}> */}
      {/*  <div className={"card-group"}> */}
      {/*    <div className={"card-group"}> */}
      {/*      <section className={"card"}> */}
      {/*        <div className="order"> */}
      {/*          <OrderDetails/> */}
      {/*        </div> */}
      {/*      </section> */}

      {/*      <section className={"card"}> */}
      {/*        <div className="order"> */}
      {/*          <OrderList getCart={cart} disabled={true}/> */}
      {/*        </div> */}
      {/*      </section> */}
      {/*    </div> */}

      {/*    <div className={"card-group"}> */}
      {/*      <section className={"card"}> */}
      {/*        <div className="payment"> */}
      {/*          <PaymentDetails/> */}
      {/*        </div> */}
      {/*      </section> */}
      {/*    </div> */}
      {/*  </div> */}

      {/*  <div className={"card-group"}> */}
      {/*    <section className={"card"}> */}
      {/*      <div className="delivery"> */}
      {/*        <DeliveryDetails/> */}
      {/*      </div> */}
      {/*    </section> */}

      {/*    <section className={"card"}> */}
      {/*      <div className="delivery"> */}
      {/*        <DeliveryTracker/> */}
      {/*      </div> */}
      {/*    </section> */}
      {/*  </div> */}
      {/* </section> */}
    </section>
  );
}

export default MiniBasketReceipt;
