import { ProductCard } from "./productCard";

import "./productCards.scss";

export function ProductRow (props) {
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
    <div className="product-cards__wrapper" data-simplebar>
      <div className="product-cards">
        {products && products.slice(0, 10).map(ProductCard).filter(Boolean)}
      </div>
    </div>
  );
}
