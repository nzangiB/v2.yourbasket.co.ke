
function OrderDetails () {

  return (
    <>
      <header>
        <div className="title">Order Details</div>
      </header>
      <section>
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
    </>
  );
}

export default OrderDetails;
