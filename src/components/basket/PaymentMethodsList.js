import { Component } from "@wearearchangel/handcrafted";

class PaymentMethodsList extends Component {
  constructor (props) {
    super(props);

    this.className = "payment__methods-list";
  }

  template () {
    return (
      <>
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
      </>
    );
  }
}

export default PaymentMethodsList;
