import { Component } from "@wearearchangel/handcrafted";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";
import HelperService from "../../services/helper.service";

import "./basket.scss";

import { MiniBasket } from "./MiniBasket";

export class Basket extends Component {
  constructor (props) {
    super(props);

    this.id = "basket";

    this._state.step = this.getStep();
    this._state.setStep = this.setStep.bind(this);
    this._state.cart = this.getCart.bind(this);
  }

  getStep () {
    const component = document.getElementById("basket");
    return component?.dataset?.step;
  }

  setStep (step) {
    const component = document.getElementById("basket");
    component.dataset.step = step;
  }

  async getCart () {
    const auth = AuthService.getCurrentUser();

    let cart;
    if (auth) {
      await DataService.getCart("cart").then((data) => {
        cart = data?.data?.data;
      }).catch((error) => {
        console.error(error);
        cart = [];
      });
    } else {
      cart = HelperService.getLocalCart();
    }

    return cart;
  }

  data () {
    const step = this.getStep();
    return { step };
  }

  async template () {
    const { cart, step, setStep } = this.state;

    return (
      <MiniBasket cart={cart} step={step} setStep={setStep}/>
    );
  }

  controller () {
    const observer = new MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "data-step") {
          const oldStep = mutation.oldValue;
          const step = mutation.target.dataset.step;
          if (oldStep !== step) this.render();
          observer.disconnect();
        }
      }
    });

    observer.observe(document.getElementById("basket"), {
      attributes: true
    });
  }
}
