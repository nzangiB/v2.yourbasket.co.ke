// import { useState } from "react";

import "./productInfo.scss";

import HelperService from "../../services/helper.service";
import { KES } from "../../helpers/formatting";

export function ProductInfo (product) {
  // const [showFullDescription, setShowFullDescription] = useState(false);
  //
  // const limitedDescription = product.description.split(" ").slice(0, 20).join(" ") + "...";
  //
  // const toggleDescription = () => {
  //   setShowFullDescription(!showFullDescription);
  // };

  const discount = HelperService.calDiscount(product);

  return (
    <section className="product-info">
      {discount && (
        <div className={"product-info__discount"}>
          <span>{discount}</span>
        </div>
      )}
      <div className={"product-info__title"}>
        <h2 className={"title"} id="title">{product.name}</h2>
      </div>
      <div className={"product-info__price"}>
        <p className={"product-info__price"} id="title">
          <span className="product-info__price--current">
            <span>{KES.format(product.offer_price)}</span>
          </span>
          <span className="product-info__price--initial">
            {(product?.mrp > product?.offer_price) && (
	            <>
		            <span className={"text"}>From</span>
		            <span className={"amount"}>{KES.format(product?.mrp)}</span>
	            </>
            )}
          </span>
        </p>
      </div>
      <div className={"product-info__description"}>
        <div className={"text"}>
          {product.description}
          {/* {showFullDescription ? product.description : limitedDescription} */}
          {/* {" "} */}
          {/* {!showFullDescription && <button className="btn --link" onClick={toggleDescription}>Read More</button>} */}
        </div>
        <div className={"metadata"}>
          {product.details}
        </div>
      </div>
    </section>
  );
}
