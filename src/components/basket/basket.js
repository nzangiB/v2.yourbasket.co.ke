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
    if (!this.root) this.root = createRoot(component);
    this.root.render(<BasketTpl {...{ id: this.id, ...this.props }} />);
  }
}
