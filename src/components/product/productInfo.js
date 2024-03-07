import { useState } from "../../plugins/react";

import { ProductRatings } from "./productRatings";
import { ProductSpecs } from "./productSpecs";

import "./productInfo.scss";

import HelperService from "../../services/helper.service";

function ProductVendor (props) {
  return (
    <section className="product-vendor">
      <div className="product-vendor__logo">
        <img src={props.logo} alt={props.vendor}/>
      </div>
      <div className="product-vendor__info">
        <h2 className="title">Store Name</h2>
        <p className="text">{props.vendor}</p>
      </div>
    </section>
  );
}

export function ProductInfo (props) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const product = props;
  const limitedDescription = product.description.split(" ").slice(0, 20).join(" ") + "...";

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const addToCart = () => {
    console.log("adding to cart...");
  };

  const checkoutNow = () => {
    console.log("checking out...");
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
      {/* <ProductRatings rating={props.rating}/> */}
      <div className={"product-info__discount"}>
        <span>{HelperService.calDiscount(product)}</span>
      </div>
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
        <p className={"text"}>
          {showFullDescription ? product.description : limitedDescription}
          {" "}
          {!showFullDescription && <button className="btn --link" onClick={toggleDescription}>Read More</button>}
        </p>
      </div>
      <div className={"btn-group --product-info__btn-group"}>
        <button className={"btn --primary --size-lg"} onClick={addToCart}>Add to cart</button>
        <button className={"btn --secondary --size-lg"} onClick={checkoutNow}>Checkout Now</button>
      </div>
      {/* <ProductSpecs size={props.size} color={props.color} price={props.price}/> */}
    </section>
  );
}
