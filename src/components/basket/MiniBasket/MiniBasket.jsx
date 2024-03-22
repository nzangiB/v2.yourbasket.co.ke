import { useEffect, useState } from "react";

import MiniBasketEdit from "./MiniBasketEdit";
import MiniBasketCheckout from "./MiniBasketCheckout";
import MiniBasketReceipt from "./MiniBasketReceipt";

import DataService from "../../../services/data.service";
import HelperService from "../../../services/helper.service";
import AuthService from "../../../services/auth.service";
import { closeBasketEvent } from "../../../helpers/basket";

import "./MiniBasket.scss";

function MiniBasket ({ step, setStep, ...props }) {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const className = ["mini-basket", step && "--visible"].filter(Boolean).join(" ");

  const getCartGlobal = async () => {
    await DataService.getCart("cart").then((data) => {
      const response = data?.data?.data;
      setCart(response);

      const total = 0;
      response.forEach((value) => {
        const price = value.price * value.quantity;
        setSubTotal(total + price);
      });
    }).catch((error) => {
      const resMessage = (error.response?.data?.msg) || error.message || error.toString();
      console.error(resMessage);
    }).finally(() => {
      setLoading(false);
    });
  };

  const getCartLocal = async () => {
    const total = 0;
    setLoading(false);
    const response = HelperService.getLocalCart();
    await Promise.all(
      response.map(async (value, i) => {
        const price = value.price * value.quantity;
        setSubTotal(total + price);

        // get each product from db.
        await DataService.getProductDetail(value.product_id, "").then((data) => {
          if (data?.data?.category) {
            response[i].Product = data?.data?.category;
          }
        }).catch((error) => {});
      })
    );
    setLoading(false);
    setSubTotal(total);
    setCart(response);
  };

  const getCart = () => {
    const auth = AuthService.getCurrentUser();
    if (!auth) {
      return getCartLocal();
    } else {
      return getCartGlobal();
    }
  };

  useEffect(() => {
    getCart();
  }, [step, subTotal]);

  let title, content;
  if (loading) {
    title = "Your Basket";
    content = (
      <section className="mini-basket__items">
        <div className="message">
					Loading...
        </div>
      </section>
    )
    ;
  } else {
    if (step?.startsWith("edit")) {
      title = "Your Basket";
      content = (
        <MiniBasketEdit {...{ ...props, loading, getCart, cart, setCart, subTotal, step, setStep }}/>
      );
    } else if (step?.startsWith("checkout")) {
      title = "Your Basket";
      content = (
        <MiniBasketCheckout {...{ ...props, loading, getCart, cart, subTotal, step, setStep }}/>
      );
    } else if (step?.startsWith("receipt")) {
      title = "Your Receipt";
      content = (
        <MiniBasketReceipt {...{ ...props, step, setStep }}/>
      );
    } else {
      title = "Your Basket";
      content = (
        <div>{step}</div>
      );
    }
  }

  const closeEvent = () => {
  };

  const minimizeEvent = () => {
  };

  const maximizeEvent = () => {
  };

  return (
    <div className={className}>
      <header className="mini-basket__header">
        <button className={"btn --icon icon-back"} onClick={closeBasketEvent}>
          <object data={require("../icons/caret-left.svg")} name={"Back"}/>
        </button>
        <div className={"title"}>{title}</div>
        {/* <button className={"btn --icon icon-close"} onClick={closeEvent}> */}
        {/*  <object data={require("./icons/maximize.svg")} name={"Back"}/> */}
        {/* </button> */}
        {/* <button className={"btn --icon icon-minimize"} onClick={minimizeBasketEvent}> */}
        {/*  <object data={require("./icons/minimize.svg")} name={"Back"}/> */}
        {/* </button> */}
        {/* <button className={"btn --icon icon-maximize"} onClick={maximizeBasketEvent}> */}
        {/*  <object data={require("./icons/maximize.svg")} name={"Back"}/> */}
        {/* </button> */}
      </header>
      {content}
    </div>
  );
}

export default MiniBasket;
