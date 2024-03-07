import placeholder from "../../assets/images/placeholder.png";

import { toast } from "../../plugins/react-toastify";

import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Signup } from "../../components/signup/signup";
import { Advert } from "../../components/advert/advert";
import { ProductDetails } from "../../components/product/productDetails";
import { RelatedProducts } from "../../components/product/relatedProducts";
import { RecentlyViewedProducts } from "../../components/product/recentlyViewedProducts";

import "./product.scss";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";
import HelperService from "../../services/helper.service";
import ProductPage from "../../components/product/productPage";

const addToWishlist = (event, item) => {
  if (!auth) return location.href = "/login";

  const element = event.currentTarget;
  if (element.className === "remove-cart") {
    // get cat id..
    if (item?.Carts) {
      DataService.deleteWishlist(item.id).then(
        () => {
          toast.success("Product removed from wishlist!", {
            position: toast.POSITION.TOP_RIGHT
          });
          element.classList.remove("remove-cart");
          element.checked = false;
          getProduct();
        },
        (error) => {
          const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.msg) ||
						error.message ||
						error.toString();

          toast.error(resMessage, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      );
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
    DataService.addCart(data).then(
      () => {
        toast.success("Product added to whislist", {
          position: toast.POSITION.TOP_RIGHT
        });
        element.checked = true;
        element.classList.add("remove-cart");
        getProduct();
      },
      (error) => {
        const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.msg) ||
					error.message ||
					error.toString();
        toast.error(resMessage, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    );
  }
};

const addToCart = async (event, item) => {
  const auth = AuthService.getCurrentUser();

  setAddedItem(item);
  setSidebarVisible(true);

  const data1 = {};
  data1.product_title = item.name;
  data1.price = item.offer_price;
  data1.product_sku = item.sku;
  data1.quantity = item.cart_qty ? item.cart_qty : "1";
  data1.variant = item.variation ? item.variation : null;
  data1.product_id = item.id;
  data1.type = "cart";
  if (!auth) {
    setLoading(true);
    HelperService.setLocalCart(data1);
    setLoading(false);
    toast.success("Product added to cart!", {
      position: toast.POSITION.TOP_RIGHT
    });
    HelperService.updateCartCount();
    window.scrollTo(0, 0);
  }

  await DataService.addCart(data1).then(() => {
    setLoading(false);
    toast.success("Product added to cart!", { position: toast.POSITION.TOP_RIGHT });
    window.scrollTo(0, 0);
  }).catch((error) => {
    const resMessage = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
  }).finally(() => {
    HelperService.updateCartCount();
  });
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
