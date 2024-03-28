import placeholder from "../../../assets/images/placeholder.png";
import heart from "../../../assets/icons/heart-small.svg";

import "./index.scss";

import HelperService from "../../../services/helper.service";
import { KES } from "../../../helpers/formatting";

export function ProductCard ({ product }) {
  if (!product.slug) return "";
  if (product.skeleton) {
    return (
      <div className="product-card-container">
        <div className="product-card">
          <div className="product-card__image">
            <div className="skeleton skeleton__image"></div>
          </div>
          <div className="product-card__details">
            <div className="text">
              <div className="skeleton skeleton__title"></div>
              <div className="skeleton skeleton__description"></div>
            </div>
            <div className="price">
              <div className="skeleton skeleton__price"></div>
            </div>
            <div className="rating">
              <div className="skeleton skeleton__rating"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const url = "/products/" + product.mastercategory.slug + "/" + product.category.slug + "/" + product.subcategory.slug + "/" + product.slug;
  const image = product.file_path
    ? `https://api.yourbasket.co.ke/${product.file_path}`
    : placeholder;

  const discount = HelperService.calDiscount(product);

  const productName = product.name.length > 60 ? product.name.substring(0, 60) + "..." : product.name;
  const productDescription = product.description.split(" ").length > 15 ? product.description.split(" ").slice(0, 15).join(" ") + "..." : product.description;

  return (
    <div className="product-card-container">
      <a className="product-card" id={product.id} data-route={url}>
        <div className="product-card__icons">
          {discount && (
            <div className="discount">
              <span>{discount}</span>
            </div>
          )}
          {/* <div className="icons"> */}
          {/*  <div className="icon"> */}
          {/*    <img src={heart} alt="Discount price"/> */}
          {/*  </div> */}
          {/* </div> */}
        </div>
        <div className="product-card__image">
          <div className={"image"}>
            <img src={image} alt={product.file_name} className="img"/>
          </div>
        </div>
        <div className="product-card__details">
          <div className="text">
            <h4 className="text__title">{productName}</h4>
            <p className="text__description">{productDescription}</p>
          </div>
          <div className="price">
            {product.offer_price && <div className="price__current">{KES.format(product.offer_price)}</div>}
            {(product?.mrp > product?.offer_price || !product.offer_price) &&
							<div className="price__initial">{KES.format(product?.mrp)}</div>}
          </div>
          <div className="rating">
            <span className="srt">4.19 out of 5 stars based on  reviews</span>
            {/* <span className="rating__stars rating__stars--filled"> */}
            {/*  <svg aria-hidden="true" className="icon is-medium"> */}
            {/*    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use> */}
            {/*  </svg> */}
            {/*  <svg aria-hidden="true" className="icon is-medium"> */}
            {/*    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use> */}
            {/*  </svg> */}
            {/*  <svg aria-hidden="true" className="icon is-medium"> */}
            {/*    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use> */}
            {/*  </svg> */}
            {/*  <svg aria-hidden="true" className="icon is-medium"> */}
            {/*    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use> */}
            {/*  </svg> */}
            {/*  <svg aria-hidden="true" className="icon is-medium"> */}
            {/*    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use> */}
            {/*  </svg> */}
            {/*  <svg aria-hidden="true" className="icon is-medium"> */}
            {/*    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use> */}
            {/*  </svg> */}
            {/* </span> */}
          </div>
        </div>
      </a>
    </div>
  );
}
