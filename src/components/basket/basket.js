import { Component } from "@wearearchangel/handcrafted";
import { createRoot } from "react-dom/client";

import BasketTpl from "./basket.tpl";

export class Basket extends Component {
  constructor (props) {
    super(props);

    this.id = "basket";
    this.render = this.render.bind(this);
    this.root = null;
  }

  setStep = (step) => {
    this.props.step = step;
    this.render();
  };

  observer = (setStep) => {
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        if (mutation.attributeName !== "data-step") continue;
        const oldStep = mutation.oldValue;
        const step = mutation.target.dataset.step;
        console.log("step received", `"${step}"`);
        if (oldStep !== step) {
          console.log("step changed from", oldStep, "to", step);
          setStep(step);
          // if (this.props.step !== step) this.setStep(step);
        }
      }
      // observer.disconnect();
    });

    return observer;
  };

  observerOptions = {
    attributes: true,
    attributeOldValue: true,
    subtree: true
  };

  template () {
    return `
      <div class="mini-basket --invisible"></div>
    `;
  }

  controller ({ component }) {
    // const target = document.getElementById(this.id);
    this.observer(this.setStep).observe(component, this.observerOptions);
    // console.log("target", target, target.dataset.step);

    // create react root
    const root = this.root !== null ? this.root : createRoot(component);
    root.render(
      <BasketTpl {...{
        id: this.id,
        ...this.props,
        step: this.props.step,
        setStep: this.setStep,
        observer: this.observer,
        observerOptions: this.observerOptions,
        render: this.render
      }}/>
    );
  }
}
