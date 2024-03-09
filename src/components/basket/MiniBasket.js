import { MiniBasketEdit } from "./MiniBasketEdit";
import { MiniBasketCheckout } from "./MiniBasketCheckout";
import { MiniBasketReceipt } from "./MiniBasketReceipt";

export function MiniBasket ({ cart, step, setStep }) {
  let title, content;
  if (step === "edit") {
    title = "Your Basket";
    content = (
      <MiniBasketEdit setStep={setStep} getCart={cart}/>
    );
  } else if (step === "checkout") {
    title = "Your Basket";
    content = (
      <MiniBasketCheckout setStep={setStep} getCart={cart}/>
    );
  } else if (step === "receipt") {
    title = "Your Receipt";
    content = (
      <MiniBasketReceipt setStep={setStep} getCart={cart}/>
    );
  } else {
    title = "Your Basket";
    content = (
      <div>{step}</div>
    );
  }

  const backEvent = () => {
    setStep("");
  };

  const closeEvent = () => {
  };

  const minimizeEvent = () => {
  };

  const maximizeEvent = () => {
  };

  return (
    <div className={["mini-basket", step && "--visible"].filter(Boolean).join(" ")}>
      <header className="mini-basket__header">
        <button className={"btn --icon icon-back"} onClick={backEvent}>
          <object data={require("./icons/caret-left.svg")} name={"Back"}/>
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
