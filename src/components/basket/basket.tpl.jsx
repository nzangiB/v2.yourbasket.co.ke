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

  const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
      // console.log("mutation", mutation.target.dataset.step);
      if (mutation.attributeName !== "data-step") continue;
      const oldStep = mutation.oldValue;
      const step = mutation.target.dataset.step;
      // console.log("step changed from", oldStep, "to", step);
      if (oldStep !== step) setStep(step);
      observer.disconnect();
    }
  });

  const observerOptions = {
    attributes: true,
    attributeOldValue: true,
    subtree: true
  };

  const target = document.getElementById(props.id);
  if (!target.dataset.step) target.dataset.step = "";
  observer.observe(target, observerOptions);

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
    }
  }, []);

  useEffect(() => {
    if (step === "") {
      observer.observe(target, observerOptions);
    } else {
      observer.disconnect();
    }
  }, [step]);

  return (
    <MiniBasket step={step} setStep={setStep} {...props} />
  );
}

export default BasketTpl;
