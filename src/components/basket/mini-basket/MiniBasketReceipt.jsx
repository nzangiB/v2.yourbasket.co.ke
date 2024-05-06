import { useEffect, useState } from "react";

import OrderList from "../orders/OrderList";
import OrderDetails from "../orders/OrderDetails";
import DeliveryDetails, { DeliveryCard } from "../delivery/DeliveryDetails";
import PaymentDetails from "../payments/PaymentDetails";
import DeliveryTracker from "../delivery/DeliveryTracker";

import "./MiniBasketReceipt.scss";
import { toast } from "react-toastify";
import DataService from "../../../services/data.service";
import { useParams } from "next/navigation";
import OrderSummary from "../orders/OrderSummary";

function MiniBasketReceipt ({ orderId, cart, setCart, step, setStep, ...props }) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [data, setData] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await DataService.getOrderDetail(orderId);
      setData(response?.data?.data);
      setOrderItems(response?.data?.data?.OrderItems);
      setTotal(response?.data?.data?.total_amount);
      setLoading(false);
    } catch (error) {
      const resMessage =
				(error.response?.data?.message) ||
				error.message ||
				error.toString();
      toast.error(resMessage, {
        position: toast.POSITION.TOP_RIGHT
      });
      setLoading(false);
    }
  };
  // const downloadInv = (e) => {
  //   var element = document.getElementById('invoice_details_wrap');
  //   html2pdf().set({ margin: 3, filename: 'order.pdf', html2canvas:  { scale: 2 }}).from(element).save();
  // }

  useEffect(() => {
    if (orderId) {
      getData();
    }
  }, [orderId]);

  const continueShoppingEvent = () => {
    setStep(undefined);
  };

  const cancelOrderEvent = (e) => {

  };

  const printReceiptEvent = (e) => {

  };

  console.log("CArt", cart);

  if (loading) {
    return (
      <section className="mini-basket__receipt">
        <div className="message">
          <span>Loading...</span>
        </div>
      </section>
    );
  } else {
    return (
      <section className="mini-basket__receipt">
        <div className="message" data-status={"success"}>
          <h3 className="title">Thank you</h3>
          <p className="text">Your order has been placed successfully</p>
        </div>

        <header className={"header"}>
          <button className={"btn --primary"} onClick={continueShoppingEvent}>
            <span>Continue Shopping</span>
          </button>
          <div className="btn-group">
            <button disabled={true} className={"btn --link"} onClick={cancelOrderEvent}>
              <span>Cancel Order</span>
            </button>
            <button disabled={true} className={"btn --secondary"} onClick={printReceiptEvent}>
              {/* <object data={require('./icons/print.svg')} name={'Print Receipt'}/> */}
              <span>Print Receipt</span>
            </button>
          </div>
        </header>

        <section className={"card-group"}>
          <div className={"card-group"}>
            <div className={"card-group"}>
              <section className={"card"}>
                <div className="order">
                  <OrderDetails order={data}/>
                </div>
              </section>

              <section className={"card"}>
                <div className="order">
                  <OrderList {...{ cart: orderItems, setStep, disabled: true, editable: false }}/>
                </div>
              </section>
            </div>

            <div className={"card-group"}>
              <section className={"card"}>
                <div className="payment">
                  <PaymentDetails payment={data}/>
                </div>
                {orderItems.length > 0 && (
                  <div className="order">
                    <OrderSummary {...{ subTotal: total, total, setTotal }}/>
                  </div>
                )}
              </section>
            </div>
          </div>

          <div className={"card-group"}>
            <section className={"card"}>
              <div className="delivery">
                <DeliveryDetails/>
              </div>
            </section>

            {/* <section className={"card"}> */}
            {/*  <div className="delivery"> */}
            {/*    /!*<DeliveryTracker/>*!/ */}
            {/*  </div> */}
            {/* </section> */}
          </div>
        </section>
      </section>
    );
  }
}

export default MiniBasketReceipt;
