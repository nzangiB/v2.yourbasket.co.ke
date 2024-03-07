import { Component } from "@wearearchangel/handcrafted";

import { ProductCard } from "./productCard";

import "./productCards.scss";

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
      <div className="product-cards__wrapper" sdata-simplebar>
        <div className="product-cards">
          {products && products.slice(0, 10).map(product => (
            <ProductCard product={product}/>
          )).filter(Boolean)}
        </div>
      </div>
    );
  }
}
