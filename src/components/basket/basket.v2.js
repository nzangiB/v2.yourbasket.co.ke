import { Component } from "@wearearchangel/handcrafted";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";

import BasketTpl from "./basket.tpl";

export class Basket extends Component {
  constructor (props) {
    super(props);

    this.id = "basket";
    this.templateEngine = "react";
    this.render = this.render.bind(this);
    this.setRoot = this.setRoot.bind(this);
    this.getRoot = this.getRoot.bind(this);
    this.setStep = this.setStep.bind(this);
    this.getStep = this.getStep.bind(this);
  }

  // TODO: Move this to hcf if templateEngine = "react"
  getRoot = () => {
    const component = document.getElementById(this.id);
    this.root = createRoot(component);
    return this.root;
  };

  // TODO: Move this to hcf if templateEngine = "react"
  setRoot = (tpl) => {
    const root = this.getRoot();
    root.render(tpl);
  };

  getStep = () => {
    // return this.props.step;
    const component = document.getElementById(this.id);
    return component?.dataset?.step;
  };

  setStep = (step) => {
    const component = document.getElementById(this.id);
    component.dataset.step = step;
    this.props.step = step;
    // TODO: move this to the this.render() workflow
    this?.root.unmount();
    this.render();
  };

  observer = () => {
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        if (mutation.attributeName !== "data-step") continue;
        const oldStep = mutation.oldValue;
        const step = mutation.target.dataset.step;
        console.log("step received", `"${step}"`);
        if (oldStep !== step) {
          console.log("step changed from", oldStep, "to", step);
          this.setStep(step);
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

  data () {
    const url = new URL(location.href);
    const urlStep = url.searchParams.get("basket");
    if (urlStep) {
      this.setStep(urlStep);
      url.searchParams.delete("basket");
      history.pushState({}, "", url.href);
    }
  }

  skeleton () {
    return `
      <div class="mini-basket --invisible"></div>
    `;
  }

  template () {
    return `
      <div class="mini-basket ${this.props.step ? "--visible" : "--invisible"}"></div>
    `;
  }

  controller ({ component }) {
    // TODO: Move this to hcf if templateEngine = "react"
    this.setRoot(
      <BasketTpl {...{
        id: this.id,
        ...this.props,
        step: this.props.step || this.getStep(),
        setStep: this.setStep,
        observer: this.observer,
        observerOptions: this.observerOptions,
        render: this.render
      }}/>
    );

    // initialize observer
    this.observer().observe(component, this.observerOptions);
  }
}
