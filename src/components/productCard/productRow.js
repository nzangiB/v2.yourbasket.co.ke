import { Component } from "@wearearchangel/handcrafted";
import { ProductCard } from "./productCard";

import "./productCards.scss";

export class ProductRow extends Component {
  data () {
    let products, options;
    if (this.props instanceof Array) {
      ({ products, options } = {
        products: this.props || [],
        options: { type: "scrollable" }
      });
    } else {
      ({ products, options } = this.props);
    }

    return { products, options };
  }

  template () {
    const { products } = this.state;

    return `
      <div class="product-cards__wrapper" data-simplebar>
          <div id="${this.id}-product-cards" class="product-cards">
              ${products && products.length > 0 ? products.slice(0, 10).map(ProductCard).join("") : ""}
          </div>
      </div>
    `;
  }
}
