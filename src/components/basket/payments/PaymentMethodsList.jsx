function PaymentMethodsList () {
  return (
    <div className={"payment__methods-list"}>
      <div className={"list-item"}>
        <object data={require("../icons/psp-mastercard.svg")} name={"Mastercard"}/>
      </div>
      <div className={"list-item"}>
        <object data={require("../icons/psp-mpesa.svg")} name={"M-Pesa"}/>
      </div>
      <div className={"list-item"}>
        <object data={require("../icons/psp-amex.svg")} name={"AMEX"}/>
      </div>
      <div className={"list-item"}>
        <object data={require("../icons/psp-visa.svg")} name={"Visa"}/>
      </div>
      <div className={"list-item"}>
        <object data={require("../icons/psp-union-pay.svg")} name={"Union Pay"}/>
      </div>
      <div className={"list-item"}>
        <object data={require("../icons/psp-american-express.svg")} name={"American Express"}/>
      </div>
    </div>
  );
}

export default PaymentMethodsList;
