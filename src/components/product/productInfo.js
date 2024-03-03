import { ProductImages } from "./productImages";
import { ProductDetails } from "./productDetails";
import { ProductReviews } from "./productReviews";

import "./productInfo.scss";

async function ProductInfo ({ product }) {
  return (
    <section className="product-info">
      <div className={"column"}>
        <ProductImages product={product}/>
      </div>
      <div className={"column"}>
        <ProductDetails {...product}/>
        <ProductReviews product={product}/>
      </div>
    </section>
  );
}

export { ProductInfo };
