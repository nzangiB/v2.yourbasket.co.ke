import { Component } from "@wearearchangel/handcrafted";
import { createRoot } from "react-dom/client";

import BasketTpl from "./basket.tpl";

export class Basket extends Component {
  constructor (props) {
    super(props);

    this.id = "basket";
  }

  controller ({ component }) {
    const root = createRoot(component);
    root.render(<BasketTpl {...{ id: this.id, ...this.props }} />);
  }
}
