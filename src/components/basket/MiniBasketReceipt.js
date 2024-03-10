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
        {/* <button className={"btn --primary"} onClick={continueShoppingEvent}> */}
        {/*  <span>Continue Shopping</span> */}
        {/* </button> */}
        {/* <div className="btn-group"> */}
        <button className={"btn --secondary"} onClick={printReceiptEvent}>
          <object data={require("./icons/print.svg")} name={"Print Receipt"}/>
          <span>Print Receipt</span>
        </button>
        <button className={"btn --link"} onClick={cancelOrderEvent}>
          <span>Cancel Order</span>
        </button>
        {/* </div> */}
      </header>

      <section className={"card-group"}>
        <div className={"card-group"}>
          <div className={"card-group"}>
            <section className={"card"}>
              <div className={"title"}>Order Details</div>
              <div className="content">
                <div className="title">Order Date:</div>
                <div className="text">December 4th, 2023 09:00AM</div>
              </div>
              <div className="content">
                <div className="title">Order Status:</div>
                <div className="text">Cancelled</div>
              </div>
              <div className="content">
                <div className="title">Order Id.:</div>
                <div className="text">#445</div>
              </div>
              <div className="content">
                <div className="title">Invoice Id.:</div>
                <div className="text">#A5445</div>
              </div>
            </section>

            <section className={"card"}>
              <div className={"title"}>Delivery Details</div>
              <div className="content">
                <div className="title">Pickup Point:</div>
                <div className="text">Duhqa Shop Pangani (Default)</div>
              </div>
              <div className="content">
                <div className="title">Shipping Cost:</div>
                <div className="text">Free</div>
              </div>
            </section>
          </div>

          <div className={"card-group"}>
            <section className={"card"}>
              <div className="order">
                <OrderList getCart={getCart} disabled={true}/>
              </div>
            </section>
          </div>
        </div>

        <div className={"card-group"}>
          <section className={"card"}>
            <div className="title">Payment Details</div>
            <div className="content">
              <div className="title">Payment Method:</div>
              <div className="text">Payment Method</div>
            </div>
            <div className="content">
              <div className="title">Payment Name:</div>
              <div className="text">Brian Mugo</div>
            </div>
            <div className="content">
              <div className="title">Payment Date</div>
              <div className="text">December 4th, 2023 09:00AM</div>
            </div>
            <div className="content">
              <OrderSummary getCart={getCart}/>
            </div>
          </section>

          <section className={"card"}>
            <div className={"title"}>Tracking</div>
          </section>
        </div>
      </section>
    </section>
  );
}
