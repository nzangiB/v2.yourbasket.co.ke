import AuthService from "../../../services/auth.service";
import DataService from "../../../services/data.service";
import HelperService from "../../../services/helper.service";
import { openBasketEvent } from "../../../helpers/basket";

import "./supportLinks.scss";

async function Account (props) {
  const isAuthenticated = AuthService.getCurrentUser();

  if (isAuthenticated) {
    const profilePic = isAuthenticated?.file_path
      ? `https://api.yourbasket.co.ke/${isAuthenticated?.file_path}`
      : require("../../../assets/images/placeholder.png");

    return (
      <a href="/account">
        <img src={profilePic} alt="Profile Picture"/>
        <span className="srt">Profile</span>
      </a>
    );
  }

  return (
    <a href="/login">
      <object
        data={require("../../../assets/icons/profile.svg")}
        name={"Profile Icon"}
      />
      <span className="srt">Sign In/ Register</span>
    </a>
  );
}

async function Wishlist (props) {
  const auth = AuthService.getCurrentUser();
  let wishlistCount = 0;

  if (auth) {
    await DataService.getCart("whislist").then((data) => {
      wishlistCount = data?.data?.data.length;
    }).catch((error) => {
      wishlistCount = 0;
    });
  }

  return (
    <a href="/wishlist">
      <object
        className={"icon"}
        data={require("../../../assets/icons/wishlist.svg")}
        name={"Wishlist Icon"}
      />
      <span id={"wishlist-count"}>
        {wishlistCount > 0
	        ? <span className="count">{wishlistCount}</span>
	        : ""}
      </span>
      <span className="srt">Wishlist</span>
    </a>
  );
}

async function Basket (props) {
  const auth = AuthService.getCurrentUser();
  let cartCount = 0;

  if (auth) {
    // getProduct
    await DataService.getCart("cart").then((data) => {
      cartCount = data?.data?.data.length;
    }).catch((error) => {
      console.error(error);
      cartCount = 0;
    });
  } else {
    const response = HelperService.getLocalCart();
    cartCount = response.length;
  }

  return (
    <button
      className={"btn --icon"}
      onClick={e => openBasketEvent(e, "edit")}
    >
      <object
        className={"icon"}
        data={require("../../../assets/icons/basket.svg")}
        name="Basket Icon"
      />
      <span id={"cart-count"}>
        {cartCount > 0
	        ? <span className="count">{cartCount}</span>
	        : ""}
      </span>
      <span className="srt">Basket</span>
    </button>
  );
}

async function SupportLinks (props) {
  return (
    <div className="support-links">
      <ul>
        <li>
          {await Account(props)}
        </li>
        <li>
          {await Wishlist(props)}
        </li>
        <li>
          {await Basket(props)}
        </li>
        <li>
          <a href="/src/components/nav/components/supportLinks">
            <object
              className={"icon"}
              data={require("../../../assets/icons/customer_care.svg")}
              name="Customer Care Icon"
            />
            <span className="srt">Customer Care</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SupportLinks;
