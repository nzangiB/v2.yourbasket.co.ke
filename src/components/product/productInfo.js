import { useState } from "../../plugins/react";

import "./productInfo.scss";

import HelperService from "../../services/helper.service";

export function ProductInfo (product) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const limitedDescription = product.description.split(" ").slice(0, 20).join(" ") + "...";

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const costPrice = parseFloat(product.cost_price).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
  const offerPrice = parseFloat(product.offer_price).toLocaleString(navigator.language, { minimumFractionDigits: 0 });
  const getDiscountRate = () => Math.floor(0 - ((costPrice - offerPrice) / costPrice) * 100, 100);
  const discount = product.cost_price && product.offer_price && getDiscountRate() > 0 ? getDiscountRate() : null;

  const KES = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0
  });

  return (
    <section className="product-info">
      {(product?.mrp > product?.offer_price) && (
        <div className={"product-info__discount"}>
          <span>{HelperService.calDiscount(product)}</span>
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
