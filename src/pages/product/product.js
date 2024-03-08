import { toast } from "../../plugins/react-toastify";

import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { ProductPage } from "../../components/product/productPage";

import "./product.scss";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";
import HelperService from "../../services/helper.service";

const addToWishlist = (event, item) => {
  const auth = AuthService.getCurrentUser();
  if (!auth) {
    location.href = "/login";
    return;
  }

  const element = event.currentTarget;
  if (element.className === "remove-cart") {
    // get cat id..
    if (item?.Carts) {
      DataService.deleteWishlist(item.id).then(() => {
        toast.success("Product removed from wishlist!", { position: toast.POSITION.TOP_RIGHT });
        element.classList.remove("remove-cart");
        element.checked = false;
        getProduct();
      }).catch((error) => {
        console.error(error);
        const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
        toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
      });
    }
  } else {
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
      getProduct();
    }).catch((error) => {
      console.error(error);
      const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
      toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
    });
  }
};

async function Product ({ params }) {
  return (
    <>
      <Header/>
      <div className="container">
        <div className="content">
          <ProductPage params={params}/>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Product;
