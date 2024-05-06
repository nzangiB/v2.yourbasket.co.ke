import HelperService from "../../../services/helper.service";

import "./OrderDetails.scss";

function OrderDetails ({ order, ...props }) {
  return (
    <div className="order__details">
      <header className="__header">
        <div className="title">Order Details</div>
      </header>
      <section className="__contents">
        <section className="contents">
          <div className="content">
            <div className="title">Order Id.:</div>
            <div className="text">#{order.id}</div>
          </div>
          <div className="content">
            <div className="title">Invoice Id.:</div>
            <div className="text">#A5{order.id}</div>
          </div>
        </section>
        <section className="contents">
          <div className="content">
            <div className="title">Order Date:</div>
            <div className="text">
              {HelperService.formatDate(order.createdAt)}
            </div>
          </div>
          <div className="content">
            <div className="title">Order Status:</div>
            <div className="text">{HelperService.orderStatus()[order.status]}</div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default OrderDetails;
