import { useEffect, useState } from "react";

import MiniBasket from "./MiniBasket/MiniBasket";

function BasketTpl (props) {
  const [step, setStep] = useState(getStepAttr());

  function getStepAttr () {
    const component = document.getElementById(props.id);
    return component?.dataset?.step;
  }

  function setStepAttr (step) {
    const component = document.getElementById(props.id);
    component.dataset.step = step;
  }

  // useEffect(() => {
  //   const component = document.getElementById(props.id);
  //   setStep(component?.dataset?.step);
  //   console.log("step", step);
  // }, [step]);

  useEffect(() => {
    const url = new URL(location.href);
    const basket = url.searchParams.get("basket");
    if (basket) {
      setStep(basket);
      url.searchParams.delete("basket");
      history.pushState({}, "", url.href);
      // props.render();
    }
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "data-step") {
          console.log("step changed");
          const oldStep = mutation.oldValue;
          const step = mutation.target.dataset.step;
          if (oldStep !== step) setStep(step);
          // if (oldStep !== step) props.render();
          observer.disconnect();
        }
      }
    });

    observer.observe(document.getElementById(props.id), {
      attributes: true
    });
  }, [step]);

  return (<MiniBasket step={step} setStep={setStep} {...props} />);
}

export default BasketTpl;
