import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import OrderList from "../orders/OrderList";
import OrderSummary from "../orders/OrderSummary";
import PaymentMethodsList from "../payments/PaymentMethodsList";

import "./MiniBasketEdit.scss";

import DataService from "../../../services/data.service";
import HelperService from "../../../services/helper.service";
import AuthService from "../../../services/auth.service";

function MiniBasketEdit ({ cart, setCart, subTotal, setSubTotal, total, setTotal, step, setStep, ...props }) {
  const [loading, setLoading] = useState(false);

  const getCart = async () => {
    let total = 0;
    await DataService.getCart("cart").then((data) => {
      const response = data?.data?.data;
      response.forEach((value) => {
        const price = parseFloat(value.price) * parseInt(value.quantity);
        total = total + price;
      });

      setSubTotal(total);
      setCart(response);
    }).catch((error) => {
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
      console.error(resMessage);
    });
  };

  const getCartLocal = async () => {
    let total = 0;
    const response = HelperService.getLocalCart();
    await Promise.all(
      response.map(async (value, i) => {
        const price = parseFloat(value.price) * parseInt(value.quantity);
        total = total + price;

        // get each product from db.
        await DataService.getProductDetail(value.product_id, "").then((data) => {
          if (data?.data?.category) response[i].Product = data?.data?.category;
        }).catch((error) => {
          const resMessage = (error.response?.data?.msg) || error.message || error.toString();
          toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
          console.error(resMessage);
        });
      })
    );

    setSubTotal(total);
    setCart(response);
  };

  const getCarts = async () => {
    const auth = AuthService.getCurrentUser();
    if (!auth) {
      await getCartLocal();
    } else {
      await getCart();
    }
  };

  useEffect(() => {
    const component = document.getElementById(props.id);
    const scrollable = component?.querySelector(".mini-basket");
    if (scrollable) scrollable.scrollTop = 0;
  }, [step]);

  useEffect(() => {
    setLoading(true);
    getCarts().then(() => { setLoading(false); });
  }, [step]);

  const checkoutNowEvent = (e) => {
    setStep("checkout");
  };

  const checkoutLaterEvent = (e) => {
    setStep("checkout/later");
  };

  if (loading) {
    return (
      <section className="mini-basket__edit">
        <div className="message">
          <span>Loading...</span>
        </div>
      </section>
    );
  } else {
    console.log(loading);
    return (
      <section className="mini-basket__edit">
        <OrderList {...{ cart, setCart, getCart, setStep }}/>

        {cart.length > 0 && (
          <>
            <section className="payment">
              <div className="payment__methods">
                <div className="payment__methods-title">
                  <div className="title">Accepted Payment Methods</div>
                </div>
                <PaymentMethodsList/>
              </div>
              <OrderSummary {...{ subTotal, setSubTotal, total, setTotal }}/>
            </section>

            <section className="btn-group">
              <button className="btn --primary" onClick={checkoutNowEvent}>
                <span>Checkout Now</span>
              </button>
              <div className="text">
                <span>or</span>
              </div>
              <button className="btn --secondary" disabled={true} onClick={checkoutLaterEvent}>
                <object data={require("../icons/calendar.svg")} name={"Checkout Later"}/>
                <span>Checkout Later</span>
              </button>
            </section>
          </>
        )}
      </section>
    );
  }
}

export default MiniBasketEdit;
