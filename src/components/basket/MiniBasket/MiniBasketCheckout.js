import { useEffect, useState } from "react";

import DataService from "../../../services/data.service";
import AuthService from "../../../services/auth.service";

import OrderList from "./OrderList";
import OrderSummary from "./OrderSummary";
import PaymentMethodsListDetailed from "./PaymentMethodsListDetailed";

import "./MiniBasketCheckout.scss";

function MiniBasketCheckout ({ loading, cart, getCart, subTotal, step, setStep, params, query }) {
  const [buyNow, setBuyNow] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

  const getProduct = async () => {
    await DataService.getCart("cart").then((data) => {
      const response = data?.data?.data;
      setCartData(response);

      const total = 0;
      response.forEach(value => {
        const price = value.price * value.quantity;
        setTotal(total + price);
      });
    }).catch((error) => {
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      console.error(resMessage);
    });
  };

  const getTempProduct = async () => {
    await DataService.getTempCart().then((data) => {
      const response = data?.data?.data;
      setCartData(data?.data?.data);

      const total = 0;
      response.forEach(value => {
        const price = value.price * value.quantity;
        setTotal(total + price);
      });
    }).catch((error) => {
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      console.error(resMessage);
    });
  };

  useEffect(() => {
    const auth = AuthService.getCurrentUser();
    if (!auth) {
      const redirectURL = new URL(window.location.href);
      redirectURL.searchParams.set("basket", "checkout");
      location.href = "/login?url=" + encodeURIComponent(redirectURL.toString());
    } else {
      if (query?.buynow) {
        setBuyNow(true);
        getTempProduct();
      } else {
        getProduct();
      }
    }
  }, []);

  // console.log("cart", cart);
  // console.log("cartData", cartData);
  // console.log("total", total);

  if (loading) {
    return (
      <section className="mini-basket__checkout">
				Loading...
      </section>
    );
  }

  return (
    <section className="mini-basket__checkout">
      <div className={"order"}>
        <OrderList {...{ cart, getCart, setStep, disabled: true, editable: true }}/>
        {cart.length > 0 && <OrderSummary {...{ subTotal, total, setTotal }}/>}
      </div>

      {cart.length > 0 && (
        <div className={"payment"}>
          <div className="payment__methods">
            <div className="payment__methods-title">
              <div className="title">Payment</div>
            </div>
            <PaymentMethodsListDetailed {...{ step, setStep, buyNow, total }}/>
          </div>
        </div>
      )}
    </section>
  );
}

export default MiniBasketCheckout;
