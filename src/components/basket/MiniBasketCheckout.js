import { OrderList } from "./OrderList";
import { OrderSummary } from "./OrderSummary";

import "./MiniBasketCheckout.scss";

export function MiniBasketCheckout ({ getCart, setStep }) {
  const payNowEvent = (e) => {
    e.preventDefault();

    setStep("receipt");
  };

  return (
    <section className="mini-basket__checkout">
      <div className={"order"}>
        <OrderList getCart={getCart} disabled={true} editable={true} setStep={setStep}/>
        <OrderSummary getCart={getCart}/>
      </div>

      <div className={"payment"}>
        <div className="payment__methods">
          <div className="payment__methods-title">
            <div className="title">Payment</div>
          </div>
          <div className="payment__methods-list--detailed">
            <div className={"list-item --selected"}>
              <div className={"title"}>
                <span>Pay Now</span>
                <object data={require("./icons/arrow-up.svg")} name={"Pay Now"}/>
              </div>
              <form className={"form details"}>
                <div className="input-field --has-label">
                  <label className={"label"}>Choose a payment method</label>
                  <select className={"input"} name="payNow" id="payNow">
                    <option value="mpesa">M-Pesa</option>
                    <option value=""></option>
                  </select>
                </div>
                <div className="input-field">
                  <input className={"input"} type="tel" placeholder={"Phone Number"}/>
                </div>
                <button className={"btn --primary"} type="submit" onClick={payNowEvent}>Pay Now</button>
              </form>
            </div>
            <div className={"list-item"}>
              <div className={"title"}>
                <span>Pay Later with Aspira</span>
                <object data={require("./icons/arrow-down.svg")} name={"Pay Later with Aspira"}/>
              </div>
            </div>
            <div className={"list-item"}>
              <div className={"title"}>
                <span>Pay on Delivery</span>
                <object data={require("./icons/arrow-down.svg")} name={"Pay on Delivery"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
