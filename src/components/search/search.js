import { createRoot } from "react-dom/client";
import { Component } from "@wearearchangel/handcrafted";

import SearchTpl from "./Search.tpl";

export class Search extends Component {
  constructor (props) {
    super(props);

    this.root = null;
  }

  controller ({ component }) {
    if (this.root == null) this.root = createRoot(component);
    this.root.render(<SearchTpl {...this.props} />);
  }
}
