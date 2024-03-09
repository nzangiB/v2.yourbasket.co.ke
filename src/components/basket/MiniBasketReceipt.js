import { OrderList } from "./OrderList";
import { OrderSummary } from "./OrderSummary";

import "./MiniBasketReceipt.scss";

export function MiniBasketReceipt ({ getCart, setStep }) {
  const continueShoppingEvent = () => {
    setStep("");
  };

  const cancelOrderEvent = (e) => {

  };

  const printReceiptEvent = (e) => {

  };

  return (
    <section className="mini-basket__receipt">
      <header className={"header"}>
        <button className={"btn --primary --size-sm"} onClick={continueShoppingEvent}>
          <span>Continue Shopping</span>
        </button>
        <div className="btn-group">
          <button className={"btn --link --size-sm"} onClick={cancelOrderEvent}>
            <span>Cancel Order</span>
          </button>
          <button className={"btn --secondary --size-sm"} onClick={printReceiptEvent}>
            {/* <object data={require("./icons/print.svg")} name={"Print Receipt"}/> */}
            <span>Print Receipt</span>
          </button>
        </div>
      </header>

      <section>
        <div>
          <div className={"cards"}>
            <section className={"card"}>
              <div className={"title"}>Order Details</div>
            </section>
            <section className={"card"}>
              <div className={"title"}>Delivery Details</div>
            </section>
          </div>

          <div className={"order"}>
            <OrderList getCart={getCart} disabled={true}/>
          </div>
        </div>

        <div>
          <div className={"payment"}>
            <section className="payment__methods">
              <div className="payment__methods-title">
                <div className="title">Payment Details</div>
              </div>
            </section>
            <OrderSummary getCart={getCart}/>
          </div>

          <div className={"card"}>
            <div className={"title"}>Tracking</div>
          </div>
        </div>
      </section>
    </section>
  );
}
