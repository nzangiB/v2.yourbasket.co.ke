import { Component } from "@wearearchangel/handcrafted";
import { createRoot } from "react-dom/client";

import BasketTpl from "./basket.tpl";

export class Basket extends Component {
  constructor (props) {
    super(props);

    this.id = "basket";
    this.root = null;
  }

  controller ({ component }) {
    // update dataset
    component.dataset.step = this.props.step ?? "";

    // create react root
    if (this.root == null) this.root = createRoot(component);
    this.root.render(<BasketTpl {...{ id: this.id, ...this.props }} />);
  }
}
