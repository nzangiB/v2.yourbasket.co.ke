import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Component } from "@wearearchangel/handcrafted";

import { ProductCard } from "./index";

import "./productCards.scss";

function ProductGroupTpl ({ id, products, options }) {
  useEffect(() => {
    const cards = document.getElementById(id);
    if (!cards) return;

    const Flickity = window.Flickity;
    new Flickity(cards, {
      cellAlign: "left",
      contain: true,
      pageDots: false,
      wrapAround: true,
      // prevNextButtons: true,
      adaptiveHeight: false,
      watchCSS: true
    });
  }, []);

  return (
    <div className="product-cards-container">
      <div className="product-cards" id={id}>
        {products && products.length
          ? products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product}/>
          ))
          : "No products found"}
      </div>
    </div>
  );
}

function ProductRowTpl (props) {
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
          <ProductCard key={product.id} product={product}/>
        )).filter(Boolean)}
      </div>
    </div>
  );
}

export class ProductGroup extends Component {
  controller ({ component }) {
    const id = this.id + "-product-cards";
    let products, options;
    if (this.props instanceof Array) {
      ({ products, options } = {
        products: this.props || [],
        options: { type: "grid" }
      });
    } else {
      ({ products, options } = this.props);
    }

    if (this.root == null) this.root = createRoot(component);
    this.root.render(<ProductGroupTpl {...{ id, products, options }} />);
  }
}

export class ProductRow extends Component {
  constructor (props) {
    super(props);

    this.root = null;
  }

  controller ({ component }) {
    if (this.root == null) this.root = createRoot(component);
    this.root.render(<ProductRowTpl {...this.props} />);
  }
}
