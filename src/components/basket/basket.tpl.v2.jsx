import { useEffect, useState } from "react";

import MiniBasket from "./MiniBasket/MiniBasket";

function BasketTpl (props) {
  const [step, setStep] = useState(props.step);

  // useEffect(() => {
  //   const step = getStepAttr();
  //   console.log("step", step);
  // }, [props.step]);

  useEffect(() => {
    const basket = document.getElementById("basket");
    const miniBasket = basket?.querySelector(".mini-basket");
    if (!miniBasket) props.render();

    // const component = document.getElementById(props.id);
    //   console.log("step", component?.dataset?.step, step);
    //   // setStep(component?.dataset?.step);
    // if (step !== component?.dataset?.step) setStep(component?.dataset?.step);
    // if (component?.dataset?.step !== step) setStepAttr(step);

    // const target = document.getElementById(props.id);
    // if (!target.dataset.step) setStepAttr("");
    // props.observer(setStep).observe(target, props.observerOptions);
    // console.log("target", target, target.dataset.step);
    // console.log("props.observer", getStepAttr(), step);
    // if (step) {
    //   console.log("step.Disconnecting...", step);
    //   props.observer(setStep).disconnect();
    // } else {
    //   console.log("step.Observing...", step);
    //   props.observer(setStep).observe(target, props.observerOptions);
    // }
  }, [step, props.step]);

  return <MiniBasket step={step} setStep={setStep} {...props} />;
}

export default BasketTpl;
