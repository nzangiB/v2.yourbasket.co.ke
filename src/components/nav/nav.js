import logo from "../../assets/logos/logo-dark.svg";
import search from "../../assets/icons/search.svg";
import profile from "../../assets/icons/profile.svg";
// import basket from "../../assets/icons/basket.svg";
import customer from "../../assets/icons/customer_care.svg";
import hamburger from "../../assets/icons/hamburger_menu.svg";

import "./nav.scss";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

function NavItem (item) {
  return `
			<li>
	        <a data-route="/categories/${item.slug}">
	            <span>${item.name}</span>
	        </a>
	        ${item?.Categories?.length
    ? `
			        <ul>
		              ${item?.Categories.map(itemDeep => {
    itemDeep.slug = item.slug + "/" + itemDeep.slug;
    return NavItem(itemDeep);
  }).filter(Boolean).join("")}
		          </ul>
          `
    : ""}
      </li>
  `;
}

function NavMain () {
  return `
      <nav class="nav__main">
          <div class="nav__logo">
              <a data-route="/">
                  <img class="img" src=${logo} alt="company logo">
              </a>
          </div>

          <div class="nav__search">
              <label for="searchInput"></label>
              <input class="field" type="text" id="searchInput" name="q" placeholder="Search products, brands and more">
              <button class="button" type="submit">
                  <img src=${search} alt="search icon">
              </button>
          </div>

          <div class="nav__links">
              <ul>
                  <li>
                      <a data-route="/login">
                          <img src="${profile}" alt="search icon">
                          <span class="srt">Sign In/ Register</span>
                      </a>
                  </li>
                  <li>
                      <a data-route="/wishlist">
                          <img src="" alt="wishlist icon">
                          <span class="srt">Wishlist</span>
                      </a>
                  </li>
                  <li>
                      <a data-route="/basket">
                          <img src="" alt="basket icon">
                          <span class="srt">Basket</span>
                      </a>
                  </li>
                  <li>
                      <a href="#">
                          <img src="${customer}" alt="customer icon">
                          <span class="srt">Customer Care</span>
                      </a>
                  </li>
              </ul>
          </div>
      </nav>
  `;
}

async function NavCategories () {
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

  return `
      <nav class="nav__categories">
          <div class="categories__all">
              <ul class="sf-menu">
                  ${categories.length
    ? `
	                    <li>
					                <a data-route="/categories">
					                    <img src="${hamburger}" alt="Hamburger Menu">
					                    <span>All Categories</span>
					                </a>				                    
					                <ul>        				
					                    ${categories.map(NavItem).filter(Boolean).join("")}
			                    </ul>
											</li>
									`
    : ""}
							</ul>
          </div>
          
          <div class="categories__list">
              <ul class="sf-menu">
                  <li>
			                <a data-route="/product/filter/top-deals">
			                    <span>Today's Deals</span>
			                </a>            				
									</li>
                  ${topCategories?.length && topCategories.map(NavItem).filter(Boolean).join("")}
							</ul>
          </div>

          <div class="categories__cta">
              <a href="#">Sell on YourBasket</a>
          </div>
      </nav>
  `;
}

export async function Nav () {
  return `
      <div class="nav">
          ${NavMain()}
          ${await NavCategories()}
      </div>    
  `;
}
