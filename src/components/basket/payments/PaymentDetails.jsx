import OrderSummary from "../orders/OrderSummary";
import HelperService from "../../../services/helper.service";

function PaymentDetails ({ payment }) {
  const userName = payment.User ? `${payment.User.first_name} ${payment.User.last_name || ""}`.trim() : "No user details";

  console.log("Payment Details", payment);
  return (
    <>
      <header className="__header">
        <div className="title">Payment Details</div>
      </header>

      <section className="__contents">
        <section className="contents">
          <div className="content">
            <div className="title">Payment Method:</div>
            <div className="text">{payment.payment_method}</div>
          </div>
          <div className="content">
            <div className="title">Payment Name:</div>
            <div className="text">{userName}</div>
          </div>
        </section>
        <section className="contents">
          <div className="content">
            <div className="title">Payment Date</div>
            <div className="text">
              {HelperService.formatDateTime(payment.createdAt)}
            </div>
          </div>
        </section>
        <section className="contents">
          {/* <OrderSummary getCart={cart}/> */}
        </section>
      </section>
    </>
  );
}

export default PaymentDetails;
