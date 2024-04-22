import { Component } from "@wearearchangel/handcrafted";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import "./navCategories.scss";

function NavItem (item) {
  return (
    <li>
      <a href={"/products/" + item.slug}>
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

export class NavCategories extends Component {
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
        <div className="categories__all">
          <div className="skeleton skeleton__categories"></div>
        </div>
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
        <div className="nav categories__all">
          <ul className="sf-menu">
            {categories.length > 0 && (
              <li>
                <a href="/products" style={{ boxShadow: "none", border: "none" }}>
                  <object
                    className={"img"}
                    data={require("../../assets/icons/hamburger_menu.svg")}
                    name="Hamburger Menu"
                  />
                  <span>All Categories</span>
                </a>
                <ul>
                  {categories.slice(0, 8).map(NavItem).filter(Boolean)}
                  {categories && categories.length > 8
                    ? (
                      <li>
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <span>Others</span>
                        </a>
                        <ul>
                          {categories.slice(8).map(NavItem).filter(Boolean)}
                        </ul>
                      </li>
                    )
                    : ""}
                </ul>
              </li>
            )}
          </ul>
        </div>

        <div className="nav categories__list">
          <ul className="sf-menu sf-navbar">
            <li>
              <a href="/products/filter/top-deals">
                <span>Today's Deals</span>
              </a>
            </li>
            {/* {categories?.length > 0 && categories.map(NavItem).filter(Boolean)} */}
          </ul>
        </div>

        <div className="cta">
          <a href="//v1.yourbasket.co.ke/#/become-vendor">
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
