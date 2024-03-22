import "./productActions.scss";

import { addToBasketEvent, addToWishlistEvent, checkoutNowEvent } from "../../helpers/basket";

export function ProductActions (product) {
  return (
    <div className={"product-actions"}>
      <div className={"btn-group --product-info__btn-group"}>
        <button
          type={"button"}
          className={"btn --secondary"}
          onClick={(e) => checkoutNowEvent(e, product)}
        >
          <span>Checkout Now</span>
        </button>
        <button
          type={"button"}
          className={"btn --primary"}
          onClick={(e) => addToBasketEvent(e, product)}
        >
          <span>Add to Basket</span>
        </button>
        {/* { */}
        {/*  (product?.Carts && product?.Carts.filter(function (value) { return value.product_id === product.id; }).length > 0) */}
        {/*    ? ( */}
        {/*      <> */}
        {/*        <div className="wishlist-icon"> */}
        {/*          <input */}
        {/*            type="checkbox" */}
        {/*            className="remove-cart" */}
        {/*            key={product.id} */}
        {/*            checked */}
        {/*            onClick={(e) => addToWishlistEvent(e, product)} */}
        {/*          /> */}
        {/*          <span className="icon-wishlist"></span> */}
        {/*        </div> */}
        {/*        <button */}
        {/*          type={"button"} */}
        {/*          className={"btn --icon"} */}
        {/*          data-cart-action="remove" */}
        {/*          onClick={(e) => addToWishlistEvent(e, product)} */}
        {/*        > */}
        {/*          <span className="icon --wishlist"></span> */}
        {/*          <span>Remove to Wishlist</span> */}
        {/*        </button> */}
        {/*      </> */}
        {/*    ) */}
        {/*    : ( */}
        {/*      <> */}
        {/*        <div className="wishlist-icon"> */}
        {/*          <input */}
        {/*            type="checkbox" */}
        {/*            key={product.id} */}
        {/*            onClick={(e) => addToWishlistEvent(e, product)} */}
        {/*          /> */}
        {/*          <span className="icon-wishlist"></span> */}
        {/*        </div> */}
        {/*        <button */}
        {/*          type={"button"} */}
        {/*          className={"btn --icon"} */}
        {/*          data-cart-action="add" */}
        {/*          onClick={(e) => addToWishlistEvent(e, product)} */}
        {/*        > */}
        {/*          <span className="icon --wishlist"></span> */}
        {/*          <span>Add to Wishlist</span> */}
        {/*        </button> */}
        {/*      </> */}
        {/*    ) */}
        {/* } */}
      </div>
    </div>
  );
}
