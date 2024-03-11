import MiniBasketEdit from "./MiniBasketEdit";
import MiniBasketCheckout from "./MiniBasketCheckout";
import MiniBasketReceipt from "./MiniBasketReceipt";

export function MiniBasket (props) {
  let title, content;
  if (props.step?.startsWith("edit")) {
    title = "Your Basket";
    content = (
      <MiniBasketEdit {...props}/>
    );
  } else if (props.step?.startsWith("checkout")) {
    title = "Your Basket";
    content = (
      <MiniBasketCheckout {...props}/>
    );
  } else if (props.step?.startsWith("receipt")) {
    title = "Your Receipt";
    content = (
      <MiniBasketReceipt {...props}/>
    );
  } else {
    title = "Your Basket";
    content = (
      <div>{props.step}</div>
    );
  }

  const backEvent = () => {
    props.setStep("");
  };

  const closeEvent = () => {
  };

  const minimizeEvent = () => {
  };

  const maximizeEvent = () => {
  };

  return (
    <div className={["mini-basket", props.step && "--visible"].filter(Boolean).join(" ")}>
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
