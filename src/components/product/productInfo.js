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

  return (
    <section className="product-info">
      {/* <ProductRatings rating={props.rating}/> */}
      <div className={"product-info__title"}>
        <h2 className={"title"} id="title">{product.name}</h2>
      </div>
      <div className={"product-info__price"}>
        <p className={"text"} id="title">
          <span>
            KSh. {product?.offer_price?.toLocaleString(navigator.language, {
	          minimumFractionDigits: 0
            })}
          </span>
          <span>
            {product?.mrp > product?.offer_price
	            ? (
		            <>
                  <span>
                    KSh. {product?.mrp?.toLocaleString(navigator.language, {
	                  minimumFractionDigits: 0
                    })}
                  </span>
			            <span>
                    {HelperService.calDiscount(product)}
                  </span>
		            </>
	            )
	            : (
		            ""
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
