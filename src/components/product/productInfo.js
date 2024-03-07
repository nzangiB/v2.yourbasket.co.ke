import { useState } from "../../plugins/react";
import { toast } from "../../plugins/react-toastify";

import { ProductRatings } from "./productRatings";
import { ProductSpecs } from "./productSpecs";

import "./productInfo.scss";

import HelperService from "../../services/helper.service";
import AuthService from "../../services/auth.service";
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

export function ProductInfo (props) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const product = props;
  const limitedDescription = product.description.split(" ").slice(0, 20).join(" ") + "...";

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const addToCart = async (e) => {
    e.preventDefault();

    // setAddedItem(product);
    // setSidebarVisible(true);

    const setLoading = (status) => {
      if (status) {
        e.target.classList.add("--loading");
        e.target.disabled = true;
        e.target.innerHTML = "Adding to basket...";
      } else {
        e.target.classList.remove("--loading");
        e.target.disabled = false;
        e.target.innerHTML = "Add to basket";
      }
    };

    const data = {};
    data.product_title = product.name;
    data.price = product.offer_price;
    data.product_sku = product.sku;
    data.quantity = product.cart_qty ? product.cart_qty : "1";
    data.variant = product.variation ? product.variation : null;
    data.product_id = product.id;
    data.type = "cart";

    setLoading(true);
    HelperService.setLocalCart(data);

    const auth = AuthService.getCurrentUser();
    if (auth) {
      await DataService.addCart(data).catch((error) => {
        console.error(error);
        const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
        toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
      });
    }

    toast.success("Product added to your basket!", { position: toast.POSITION.TOP_RIGHT });
    HelperService.updateCartCount();
    // window.scrollTo(0, 0);
    setLoading(false);
  };

  const checkoutNow = (e) => {
    e.preventDefault();
    e.target.classList.add("--loading");
    e.target.disabled = true;
    e.target.innerHTML = "Checking out...";

    console.log("checking out...");

    e.target.classList.remove("--loading");
    e.target.disabled = false;
    e.target.innerHTML = "Checkout Now";
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
        <p className={"text"}>
          {showFullDescription ? product.description : limitedDescription}
          {" "}
          {!showFullDescription && <button className="btn --link" onClick={toggleDescription}>Read More</button>}
        </p>
      </div>
      <div className={"btn-group --product-info__btn-group"}>
        <button type={"button"} className={"btn --primary --size-lg"} onClick={addToCart}>Add to basket</button>
        <button type={"button"} className={"btn --secondary --size-lg"} onClick={checkoutNow}>Checkout Now</button>
      </div>
      {/* <ProductSpecs size={props.size} color={props.color} price={props.price}/> */}
    </section>
  );
}
