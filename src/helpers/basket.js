import AuthService from "../services/auth.service";
import DataService from "../services/data.service";
import HelperService from "../services/helper.service";
import { toast } from "../plugins/react-toastify";

export const openBasketEvent = (event, step) => {
  event?.preventDefault();

  const basket = document.getElementById("basket");
  if (basket) basket.dataset.step = step;
};

export const closeBasketEvent = (event) => {
  event?.preventDefault();

  const basket = document.getElementById("basket");
  if (basket) basket.dataset.step = "";
};

export const addToWishlistEvent = (event, item) => {
  const auth = AuthService.getCurrentUser();
  if (!auth) {
    location.href = "/login";
    return;
  }

  const removeItem = () => {
    // get cat id.
    if (item?.Carts) {
      DataService.deleteWishlist(item.id).then(() => {
        toast.success("Product removed from wishlist!", { position: toast.POSITION.TOP_RIGHT });
        element.classList.remove("remove-cart");
        element.checked = false;
        // getProduct();
      }).catch((error) => {
        console.error(error);
        const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
        toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
      });
    }
  };

  const addItem = () => {
    const data = {};
    data.product_title = item.name;
    data.price = item.offer_price;
    data.product_sku = item.sku;
    data.quantity = "1";
    data.variant = "";
    data.product_id = item.id;
    data.type = "whislist";

    DataService.addCart(data).then(() => {
      toast.success("Product added to wishlist", { position: toast.POSITION.TOP_RIGHT });
      element.checked = true;
      element.classList.add("remove-cart");
      // getProduct();
    }).catch((error) => {
      console.error(error);
      const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  };

  const element = event.currentTarget;
  if (element.className === "remove-cart") { removeItem(); } else { addItem(); }
};

export const addToBasketEvent = async (event, item) => {
  event.preventDefault();

  const setLoading = (status) => {
    if (status) {
      event.target.classList.add("--loading");
      event.target.disabled = true;
      event.target.innerHTML = "Adding to basket...";
    } else {
      event.target.classList.remove("--loading");
      event.target.disabled = false;
      event.target.innerHTML = "Add to basket";
    }
  };

  const data = {};
  data.product_title = item.name;
  data.price = item.offer_price;
  data.product_sku = item.sku;
  data.quantity = item.cart_qty ? item.cart_qty : "1";
  data.variant = item.variation ? item.variation : null;
  data.product_id = item.id;
  data.type = "cart";

  setLoading(true);
  const auth = AuthService.getCurrentUser();
  if (auth) {
    await DataService.addCart(data).catch((error) => {
      console.error(error);
      const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  } else {
    HelperService.setLocalCart(data);
    toast.success("Product added to your basket!", { position: toast.POSITION.TOP_RIGHT });
    HelperService.updateCartCount();
  }

  window.scrollTo(0, 0);
  setLoading(false);
};

export const checkoutNowEvent = async (event, item) => {
  event.preventDefault();

  event.target.classList.add("--loading");
  event.target.disabled = true;
  event.target.innerHTML = "Checking out...";

  await addToBasketEvent(event, item);
  openBasketEvent(event, "checkout");

  event.target.classList.remove("--loading");
  event.target.disabled = false;
  event.target.innerHTML = "Checkout Now";
};
