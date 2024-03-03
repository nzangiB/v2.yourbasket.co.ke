import { ProductImages } from "./productImages";
import { ProductInfo } from "./productInfo";
import { ProductReviews } from "./productReviews";

import "./productDetails.scss";

async function ProductDetails ({ product }) {
  return (
    <section className="product-details">
      <div className={"column"}>
        <div className={"product-detail"}>
          <ProductImages product={product}/>
        </div>
      </div>
      <div className={"column"}>
        <div className={"product-detail"}>
          <ProductInfo {...product}/>
        </div>
        <div className={"product-detail"}>
          <ProductReviews product={product}/>
        </div>
      </div>
    </section>
  );
}

export { ProductDetails };
