import { Component } from "@wearearchangel/handcrafted";

export class PaymentMethods extends Component {
  template () {
    return (
      <section className="payment__methods">
        <div className="payment__methods-title">
          <div className="title">Accepted Payment Methods</div>
        </div>
        <div className="payment__methods-list">
          <div className={"list-item"}>
            <object data={require("./icons/mastercard.svg")} name={"Mastercard"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/mpesa.svg")} name={"M-Pesa"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/amex.svg")} name={"AMEX"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/visa.svg")} name={"Visa"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/union-pay.svg")} name={"Union Pay"}/>
          </div>
          <div className={"list-item"}>
            <object data={require("./icons/american-express.svg")} name={"American Express"}/>
          </div>
        </div>
      </section>
    );
  }
}
