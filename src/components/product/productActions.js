import { toast } from "../../plugins/react-toastify";

import HelperService from "../../services/helper.service";
import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import "./productActions.scss";

export function ProductActions (product) {
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

  return (
    <div className={"product-actions"}>
      <div className={"btn-group --product-info__btn-group"}>
        <button type={"button"} className={"btn --primary --size-lg"} onClick={addToCart}>Add to basket</button>
        <button type={"button"} className={"btn --secondary --size-lg"} onClick={checkoutNow}>Checkout Now</button>
      </div>
    </div>
  );
}
