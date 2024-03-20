import placeholder from "../../assets/images/placeholder.png";
import logo from "../../assets/logos/logo-dark.svg";
import search from "../../assets/icons/search.svg";
import profile from "../../assets/icons/profile.svg";
import basket from "../../assets/icons/basket.svg";
import wishlist from "../../assets/icons/wishlist.svg";
import customer from "../../assets/icons/customer_care.svg";
import hamburger from "../../assets/icons/hamburger_menu.svg";

import "./nav.scss";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";
import { Component } from "@wearearchangel/handcrafted";
import HelperService from "../../services/helper.service";

function Logo () {
  return (
    <div className="logo">
      <a data-route="/">
        <img className="img" src={logo} alt="company logo"/>
      </a>
    </div>
  );
}

function Search (props) {
  const keyUpEvent = (e) => {
    if (e.key === "Enter") {
      location.href = `/search?q=${e.target.value}`;
    }
  };

  const submitEvent = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector("input[name=q]");
    location.href = `/search?q=${searchInput.value}`;
  };

  return (
    <form className="search-form" onSubmit={submitEvent}>
      <label htmlFor="searchInput"></label>
      <input
        className="field"
        type="text"
        id="searchInput"
        name="q"
        placeholder="Search products, brands and more"
        onKeyUp={keyUpEvent}
      />
      <button className="button" type="submit">
        <img src={search} alt="search icon"/>
      </button>
    </form>
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
    <>
      {wishlistCount > 0
        ? <span className="count">{wishlistCount}</span>
        : ""}
    </>
  );
}

async function Basket (props) {
  const auth = AuthService.getCurrentUser();
  let cartCount = 0;

  if (auth) {
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
    <>
      {cartCount > 0
        ? <span className="count">{cartCount}</span>
        : ""}
    </>
  );
}

async function Support (props) {
  const isAuthenticated = AuthService.getCurrentUser();
  const profilePic = isAuthenticated?.file_path
    ? `https://api.yourbasket.co.ke/${isAuthenticated?.file_path}`
    : placeholder;

  const openBasketEvent = (e) => {
    const basket = document.getElementById("basket");
    basket.dataset.step = "edit";

    const miniBasket = basket.querySelector(".mini-basket");
    if (miniBasket.classList.contains("--visible")) {
      miniBasket.classList.replace("--invisible", "--visible");
    } else {
      miniBasket.classList.add("--visible");
    }
  };

  return (
    <div className="support-links">
      <ul>
        <li>
          {isAuthenticated
            ? (
              <a data-route="/account">
                <img src={profilePic} alt="Profile Picture"/>
                <span className="srt">Profile</span>
              </a>
            )
            : (
              <a data-route="/login">
                <img src={profile} alt="Profile Icon"/>
                <span className="srt">Sign In/ Register</span>
              </a>
            )}
        </li>
        <li>
          <a data-route="/wishlist">
            <object data={wishlist} name={"Wishlist Icon"}/>
            <span id={"wishlist-count"}>
              {await Wishlist(props)}
            </span>
            <span className="srt">Wishlist</span>
          </a>
        </li>
        <li>
          <button className={"btn --icon"} onClick={openBasketEvent}>
            <object className={"icon"} data={basket} name="Basket Icon"/>
            <span id={"cart-count"}>
              {await Basket(props)}
            </span>
            <span className="srt">Basket</span>
          </button>
        </li>
        <li>
          <a data-route="/support">
            <img src={customer} alt="Customer Care Icon"/>
            <span className="srt">Customer Care</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

function NavItem (item) {
  return (
    <li>
      <a data-route={"/categories/" + item.slug}>
        <span>{item.name}</span>
      </a>
      {item?.Categories?.length > 0 && (
        <ul>
          {item.Categories.map(itemDeep => {
            itemDeep.slug = item.slug + "/" + itemDeep.slug;
            return NavItem(itemDeep);
          }).filter(Boolean)}
        </ul>
      )}
    </li>
  );
}

export class NavHeader extends Component {
  skeleton () {
    return (
      <div className="nav nav-header">
        <div className="logo">
          <div className="skeleton skeleton__logo"></div>
        </div>
        <div className="search-form">
          <div className="skeleton skeleton__search"></div>
        </div>
        <div className="support-links">
          <div className="skeleton skeleton__links"></div>
        </div>
      </div>
    );
  }

  template () {
    const props = this.props;
    return (
      <>
        <Logo {...props}/>
        <Search {...props}/>
        <Support {...props}/>
      </>
    );
  }
}

export class Categories extends Component {
  async data () {
    const auth = AuthService.getCurrentUser();
    const userId = (auth) ? auth.id : "";
    const data = await DataService.getHomePageData(userId);
    const topCategories = data.data.categories;
    const categories = data.data.masterCategories;

    return { topCategories, categories };
  }

  skeleton () {
    return (
      <div className="categories">
        {/* <div className="categories__all"> */}
        {/*  <div className="skeleton skeleton__categories"></div> */}
        {/* </div> */}
        <div className="categories__list">
          <div className="skeleton skeleton__categories"></div>
        </div>
        <div className="categories__cta">
          <div className="skeleton skeleton__cta"></div>
        </div>
      </div>
    );
  }

  template () {
    const { topCategories, categories } = this.state;
    return (
      <nav className="categories">
        {/* <div className="nav categories__all"> */}
        {/*  <ul className="sf-menu"> */}
        {/*    {categories.length > 0 && ( */}
        {/*      <li> */}
        {/*        <a data-route="/categories"> */}
        {/*          <img src={hamburger} alt="Hamburger Menu"/> */}
        {/*          <span>All Categories</span> */}
        {/*        </a> */}
        {/*        <ul> */}
        {/*          {categories.map(NavItem).filter(Boolean)} */}
        {/*        </ul> */}
        {/*      </li> */}
        {/*    )} */}
        {/*  </ul> */}
        {/* </div> */}

        <div className="nav categories__list">
          <ul className="sf-menu sf-navbar">
            <li>
              <a data-route="/products/filter/top-deals">
                <span>Today's Deals</span>
              </a>
            </li>
            {categories?.length > 0 && categories.map(NavItem).filter(Boolean)}
          </ul>
        </div>

        <div className="cta">
          <a href="#">
            <span>Sell on YourBasket</span>
          </a>
        </div>
      </nav>
    );
  }

  controller () {
    const jQuery = window.jQuery;
    if (jQuery) {
      jQuery(document).ready(function () {
        jQuery("ul.sf-menu").superfish({
          animation: { opacity: "show", height: "show" },
          cssArrows: false,
          speed: "fast"
        });
      });
    }
  }
}

export function Nav () {
  return (
    <div className="nav">
      <NavHeader/>
      <Categories/>
    </div>
  );
}
