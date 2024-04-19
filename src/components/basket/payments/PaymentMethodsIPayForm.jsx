function PaymentMethodsIPayForm () {
  return (
    <div style={{ display: "none" }}>
      <form id="ipay-payment-form" method="post" action="https://payments.ipayafrica.com/v3/ke">
      </form>
    </div>
  );
}

export default PaymentMethodsIPayForm;
