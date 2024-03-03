import placeholder from "../../assets/images/placeholder.png";
import logo from "../../assets/logos/logo-dark.svg";
import search from "../../assets/icons/search.svg";
import profile from "../../assets/icons/profile.svg";
import basket from "../../assets/icons/cart_icon.svg";
import customer from "../../assets/icons/customer_care.svg";
import hamburger from "../../assets/icons/hamburger_menu.svg";

import "./nav.scss";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

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

export function NavMain () {
  const isAuthenticated = AuthService.getCurrentUser();
  const profilePic = isAuthenticated?.file_path
    ? `https://api.yourbasket.co.ke/${isAuthenticated?.file_path}`
    : placeholder;

  return (
    <nav className="nav__main">
      <div className="nav__logo">
        <a data-route="/">
          <img className="img" src={logo} alt="company logo"/>
        </a>
      </div>

      <div className="nav__search">
        <label htmlFor="searchInput"></label>
        <input className="field" type="text" id="searchInput" name="q" placeholder="Search products, brands and more"/>
        <button className="button" type="submit">
          <img src={search} alt="search icon"/>
        </button>
      </div>

      <div className="nav__links">
        <ul>
          <li>
            {isAuthenticated
              ? (
                <a data-route="/profile">
                  <img src={profilePic} alt="profile picture"/>
                  <span className="srt">Profile</span>
                </a>
              )
              : (
                <a data-route="/login">
                  <img src={profile} alt="profile icon"/>
                  <span className="srt">Sign In/ Register</span>
                </a>
              )}
          </li>
          <li>
            <a data-route="/wishlist">
              <img src={"wishlist"} alt="wishlist icon"/>
              <span className="srt">Wishlist</span>
            </a>
          </li>
          <li>
            <a data-route="/basket">
              <img src={basket} alt="basket icon"/>
              <span className="srt">Basket</span>
            </a>
          </li>
          <li>
            <a href="#">
              <img src={customer} alt="customer icon"/>
              <span className="srt">Customer Care</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export async function NavCategories () {
  const auth = AuthService.getCurrentUser();
  const userId = (auth) ? auth.id : "";
  const data = await DataService.getHomePageData(userId);
  const topCategories = data.data.categories;
  const categories = data.data.masterCategories;

  setTimeout(async () => {
    const jQuery = window.jQuery;
    jQuery(document).ready(function () {
      jQuery("ul.sf-menu").superfish({
        animation: { opacity: "show", height: "show" },
        cssArrows: false,
        speed: "fast"
      });
    });
  }, 1000);

  return (
    <nav className="nav__categories">
      <div className="categories__all">
        <ul className="sf-menu">
          {categories.length > 0 && (
            <li>
              <a data-route="/categories">
                <img src={hamburger} alt="Hamburger Menu"/>
                <span>All Categories</span>
              </a>
              <ul>
                {categories.map(NavItem).filter(Boolean)}
              </ul>
            </li>
          )}
        </ul>
      </div>

      <div className="categories__list">
        <ul className="sf-menu">
          <li>
            <a data-route="/product/filter/top-deals">
              <span>Today's Deals</span>
            </a>
          </li>
          {topCategories?.length > 0 && topCategories.map(NavItem).filter(Boolean)}
        </ul>
      </div>

      <div className="categories__cta">
        <a href="#">Sell on YourBasket</a>
      </div>
    </nav>
  );
}

export async function Nav () {
  return (
    <div className="nav">
      <NavMain/>
      <NavCategories/>
    </div>
  );
}
