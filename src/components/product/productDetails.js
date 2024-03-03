import { useState } from "../../plugins/react";

import { ProductRatings } from "./productRatings";
import { ProductSpecs } from "./productSpecs";

import "./productDetails.scss";

import HelperService from "../../services/helper.service";
import DataService from "../../services/data.service";

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

export async function ProductDetails (props) {
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

  const dw = await DataService.getProductReviews(product.id, "asc");
  const reviews = dw.data.reviews;
  const reviewsCount = dw.data.reviewsCount;

  let totalRating = 0;
  const ratings = [];
  if (reviewsCount?.length) {
    reviewsCount.map((value) => {
      totalRating += value.total_rating;
    });
    const ratingValue = totalRating / reviewsCount?.length;
    for (let i = 0; i < 5; i++) {
      ratings.push(ratingValue - i);
    }
  }

  console.log(ratings);

  return (
    <section className="product-details">
      {/* <ProductRatings rating={props.rating}/> */}
      {ratings}
      <div className={"product-details__title"}>
        <h2 className={"title"} id="title">{product.name}</h2>
      </div>
      <div className={"product-details__price"}>
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
      <div className={"product-details__description"}>
        <p className={"text"}>
          {showFullDescription ? product.description : limitedDescription}
          {" "}
          {!showFullDescription && <button className="btn --link" onClick={toggleDescription}>Read More</button>}
        </p>
      </div>
      <div className={"btn-group --product-details__btn-group"}>
        <button className={"btn --primary --size-lg"} onClick={addToCart}>Add to cart</button>
        <button className={"btn --secondary --size-lg"} onClick={checkoutNow}>Checkout Now</button>
      </div>
      {/* <ProductSpecs size={props.size} color={props.color} price={props.price}/> */}
    </section>
  );
}
