import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MiniBasketEdit from "./MiniBasketEdit";
import MiniBasketCheckout from "./MiniBasketCheckout";
import MiniBasketReceipt from "./MiniBasketReceipt";

import { closeBasketEvent } from "../../../helpers/basket";

import "./MiniBasket.scss";

function MiniBasket ({ step, setStep, ...props }) {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const className = ["mini-basket", step && "--visible"].filter(Boolean).join(" ");

  let title, content;
  if (step?.startsWith("edit")) {
    title = "Your Basket";
    content = (
      <MiniBasketEdit {...{
        ...props,
        step,
        setStep,
        cart,
        setCart,
        subTotal,
        setSubTotal,
        total,
        setTotal
      }}/>
    );
  } else if (step?.startsWith("checkout")) {
    title = "Your Basket";
    content = (
      <MiniBasketCheckout {...{
        ...props,
        step,
        setStep,
        cart,
        setCart,
        subTotal,
        setSubTotal,
        total,
        setTotal
      }}/>
    );
  } else if (step?.startsWith("receipt")) {
    title = "Your Receipt";
    content = (
      <MiniBasketReceipt {...{
        ...props,
        step,
        setStep
      }}/>
    );
  } else {
    title = "Your Basket";
    content = (
      <div>{step}</div>
    );
  }

  const closeEvent = () => {
  };

  const minimizeEvent = () => {
  };

  const maximizeEvent = () => {
  };

  return (
    <>
      <ToastContainer/>
      <div className={className}>
        <header className="mini-basket__header">
          {/* <button className={"btn --icon icon-back"} onClick={closeBasketEvent}> */}
          {/*  <object data={require("../icons/caret-left.svg")} name={"Back"}/> */}
          {/* </button> */}
          <button className={"btn --icon icon-close"} onClick={closeBasketEvent}>
            <object data={require("../icons/close.svg")} name={"Close"}/>
          </button>
          <div className={"title"}>{title}</div>
          {/* <button className={"btn --icon icon-minimize"} onClick={minimizeBasketEvent}> */}
          {/*  <object data={require("../icons/minimize.svg")} name={"Back"}/> */}
          {/* </button> */}
          {/* <button className={"btn --icon icon-maximize"} onClick={maximizeBasketEvent}> */}
          {/*  <object data={require("../icons/maximize.svg")} name={"Back"}/> */}
          {/* </button> */}
        </header>
        {content}
      </div>
    </>
  );
}

export default MiniBasket;
