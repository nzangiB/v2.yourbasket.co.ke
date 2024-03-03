import { Component } from "@wearearchangel/handcrafted";
import { ProductCard } from "./productCard";

import "./productCards.scss";

export class ProductGroup extends Component {
  data () {
    let products, options;
    if (this.props instanceof Array) {
      ({ products, options } = {
        products: this.props || [],
        options: { type: "grid" }
      });
    } else {
      ({ products, options } = this.props);
    }

    return { products, options };
  }

  template () {
    const { products } = this.state;

    return `
        <div class="product-cards__wrapper">
            <div id="${this.id}-product-cards" class="product-cards">
                ${products && products.length > 0 ? products.slice(0, 10).map(ProductCard).join("") : "No products found"}
            </div>
        </div>
    `;
  }

  controller () {
    const cards = document.getElementById(`${this.id}-product-cards`);
    if (!cards) return;

    const Flickity = window.Flickity;
    new Flickity(cards, {
      cellAlign: "left",
      contain: true,
      pageDots: false,
      wrapAround: true,
      // prevNextButtons: true,
      adaptiveHeight: true
      // watchCSS: true
    });
  }
}
