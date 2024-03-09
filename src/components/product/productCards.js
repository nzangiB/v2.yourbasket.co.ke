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
    return (
      <div className="product-cards-container">
        <div className="product-cards" id={this.id + "-product-cards"}>
          {products && products.length
            ? products.slice(0, 10).map(product => (
              <ProductCard product={product}/>
            ))
            : "No products found"}
        </div>
      </div>
    );
  }

  controller () {
    const cards = document.getElementById(`${this.id}-product-cards`);
    if (!cards) return;

    const Flickity = window.Flickity;
    new Flickity(cards, {
      cellAlign: "left",
      contain: true,
      pageDots: false,
      wrapAround: true
      // prevNextButtons: true,
      // adaptiveHeight: true
      // watchCSS: true
    });
  }
}

export class ProductRow extends Component {
  template () {
    const props = this.props;
    let products, options;
    if (props instanceof Array) {
      ({ products, options } = {
        products: props || [],
        options: { type: "scrollable" }
      });
    } else {
      ({ products, options } = props);
    }

    return (
      <div className="product-cards-container">
        <div className="product-cards">
          {products && products.slice(0, 10).map(product => (
            <ProductCard product={product}/>
          )).filter(Boolean)}
        </div>
      </div>
    );
  }
}
