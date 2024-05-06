import { useEffect, useState } from "react";

import DataService from "../../../services/data.service";
import AuthService from "../../../services/auth.service";

import OrderList from "../orders/OrderList";
import OrderSummary from "../orders/OrderSummary";
import DeliveryDetails from "../delivery/DeliveryDetails";
import PaymentMethodsListDetailed from "../payments/PaymentMethodsListDetailed";

import "./MiniBasketCheckout.scss";

function MiniBasketCheckout ({
  params,
  query,
  cart,
  setCart,
  subTotal,
  setSubTotal,
  total,
  setTotal,
  step,
  setStep,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const [buyNow, setBuyNow] = useState(false);

  const auth = AuthService.getCurrentUser();
  const redirectURL = new URL(window.location.href);
  redirectURL.searchParams.set("basket", "checkout");
  const loginUrl = "/login?url=" + encodeURIComponent(redirectURL.toString());

  const getCart = async () => {
    await DataService.getCart("cart").then((data) => {
      const response = data?.data?.data;
      setCart(response);

      let total = 0;
      response.forEach(value => {
        const price = parseFloat(value.price) * parseInt(value.quantity);
        total = total + price;
      });

      setSubTotal(total);
    }).catch((error) => {
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      console.error(resMessage);
    });
  };

  const getTempCart = async () => {
    await DataService.getTempCart().then((data) => {
      const response = data?.data?.data;
      setCart(data?.data?.data);

      let total = 0;
      response.forEach(value => {
        const price = parseFloat(value.price) * parseInt(value.quantity);
        total = total + price;
      });

      setSubTotal(total);
    }).catch((error) => {
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      console.error(resMessage);
    });
  };

  const getCarts = async () => {
    if (query?.buynow) {
      setBuyNow(true);
      await getTempCart();
    } else {
      await getCart();
    }
  };

  useEffect(() => {
    if (!auth) {
      location.href = loginUrl;
    } else {
      setLoading(true);
      getCarts().then(() => { setLoading(false); });
    }
  }, [step]);

  useEffect(() => {
    const component = document.getElementById(props.id);
    const scrollable = component?.querySelector(".mini-basket");
    if (scrollable) scrollable.scrollTop = 0;
  }, [step]);

  if (loading) {
    return (
      <section className="mini-basket__checkout">
        <div className="message">
          <span>Loading...</span>
        </div>
      </section>
    );
  } else {
    console.log(loading);
    return (
      <section className="mini-basket__checkout">
        {auth && (
          <div className="auth">
            <p className="text">
							You are paying as <span>{auth.email}</span>.
							&nbsp;
              <a className="btn --link" rel="noopener follow" href={loginUrl}>Not you?</a>
            </p>
          </div>
        )}

        <div className="delivery">
          <DeliveryDetails/>
        </div>

        <div className={"order"}>
          <OrderList {...{ cart, setStep, disabled: true, editable: true }}/>
          {cart.length > 0 && <OrderSummary {...{ subTotal, setSubTotal, total, setTotal }}/>}
        </div>

        {cart.length > 0 && (
          <div className={"payment"}>
            <div className="payment__methods">
              <div className="payment__methods-title">
                <div className="title">Payment</div>
              </div>
              <PaymentMethodsListDetailed {...{ params, query, step, setStep, buyNow, total }}/>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default MiniBasketCheckout;
