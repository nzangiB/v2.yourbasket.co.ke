import { ProductImages } from "./productImages";
import { ProductInfo } from "./productInfo";
import { ProductReviews } from "./productReviews";
import { ProductRatings } from "./productRatings";
import { RelatedProducts } from "./relatedProducts";
import { ProductVendor } from "./productVendor";
import { ProductActions } from "./productActions";
import { ProductSpecs } from "./productSpecs";

import "./productDetails.scss";

async function ProductDetails ({ product }) {
  return (
    <section className="product-details">
      <div className={"column"}>
        <div className={"product-detail"}>
          <ProductImages product={product}/>
        </div>
        <div className={"product-detail"}>
          <ProductReviews product={product}/>
        </div>
      </div>

      <div className={"column"}>
        <div className={"product-detail"}>
          <ProductRatings productId={product.id}/>
          <ProductInfo {...product}/>
          <ProductSpecs variant={product.variant}/>
          <ProductVendor brand={product?.Brand} vendor={product?.User}/>
          <ProductActions {...product}/>
        </div>
        <div className={"product-detail"}>
          <RelatedProducts product={product}/>
        </div>
      </div>
    </section>
  );
}

export { ProductDetails };
