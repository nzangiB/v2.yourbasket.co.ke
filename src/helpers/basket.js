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

const handleCartAddition = async (item) => {
  const data = {
    product_title: item.name,
    price: item.offer_price,
    product_sku: item.sku,
    quantity: item.cart_qty,
    variant: item.variation || "",
    product_id: item.id,
    type: "cart"
  };

  const auth = AuthService.getCurrentUser();
  if (auth) {
    return DataService.addCart(data);
  } else {
    HelperService.setLocalCart(data);
    HelperService.updateCartCount();
    return Promise.resolve(); // Simulate async operation for consistency
  }
};

export const addToBasketEvent = async (event, item) => {
  event.preventDefault();
  updateLoadingState(event.target, true);

  const newItem = { ...item, cart_qty: 1 };
  // console.log("Attempting to add item to basket with quantity:", newItem.cart_qty);

  try {
    await handleCartAddition(newItem);
    toast.success("Product added to your basket!", { position: toast.POSITION.TOP_RIGHT });
  } catch (error) {
    console.error("Error while adding to basket:", error);
    const resMessage = (error.response?.data?.msg) || error.message || error.toString();
    toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
  } finally {
    updateLoadingState(event.target, false);
    window.scrollTo(0, 0);
  }
};


const updateLoadingState = (target, isLoading) => {
  if (isLoading) {
    target.classList.add("--loading");
    target.disabled = true;
    target.innerHTML = "Adding to basket...";
  } else {
    target.classList.remove("--loading");
    target.disabled = false;
    target.innerHTML = "Add to basket";
  }
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
