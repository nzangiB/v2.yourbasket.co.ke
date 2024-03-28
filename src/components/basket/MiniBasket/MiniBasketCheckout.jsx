import { useEffect, useState } from "react";

import DataService from "../../../services/data.service";
import AuthService from "../../../services/auth.service";

import OrderList from "../Orders/OrderList";
import OrderSummary from "../Orders/OrderSummary";
import PaymentMethodsListDetailed from "../Payments/PaymentMethodsListDetailed";

import "./MiniBasketCheckout.scss";

function MiniBasketCheckout ({ params, query, cart, getCart, subTotal, step, setStep, ...props }) {
  const [loading, setLoading] = useState(true);
  const [buyNow, setBuyNow] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const component = document.getElementById(props.id);
    const scrollable = component?.querySelector(".mini-basket");
    if (scrollable) scrollable.scrollTop = 0;
  }, [step]);

  const getProduct = async () => {
    await DataService.getCart("cart").then((data) => {
      const response = data?.data?.data;
      setCartData(response);

      const total = 0;
      response.forEach(value => {
        const price = parseFloat(value.price) * parseInt(value.quantity);
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
        const price = parseFloat(value.price) * parseInt(value.quantity);
        setTotal(total + price);
      });
    }).catch((error) => {
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      console.error(resMessage);
    });
  };

  useEffect(() => {
    const auth = AuthService.getCurrentUser();
    if (auth) {
      if (query?.buynow) {
        setBuyNow(true);
        getTempProduct();
      } else {
        getProduct();
      }
    } else {
      getCart().then(() => { setLoading(false); });
    }
  }, [step, subTotal]);

  if (loading) {
    return (
      <section className="mini-basket__checkout">
        <div className="message">
					Loading...
        </div>
      </section>
    );
  }

  return !loading && (
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
