import { Component } from "@wearearchangel/handcrafted";
import { createRoot } from "react-dom/client";

import MiniBasket from "./MiniBasket";

export default class MiniBasketComponent extends Component {
  controller ({ component }) {
    const root = createRoot(component);
    root.render(<MiniBasket {...this.props} />);
  }
}
