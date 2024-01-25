import logo from "../../assets/logos/logo-dark.svg";
import search from "../../assets/icons/search.svg";
import profile from "../../assets/icons/profile.svg";
import cart from "../../assets/icons/cart_default.svg";
import customer from "../../assets/icons/customer_care.svg";
import hamburger from "../../assets/icons/hamburger_menu.svg";

import "./nav.scss";

export function Nav (props) {
  return `
    <div class="nav">
        <nav class="nav__main">
            <div class="nav__logo">
                <a href="#">
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
                        <a href="#">
                            <img src="${profile}" alt="search icon">
                            <span>Sign In/ Register</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="${cart}" alt="cart icon">
                            <span>Cart</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="${customer}" alt="customer icon">
                            <span>Customer Care</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <nav class="nav__categories">
            <ul class="category__links">
                <li>
                    <a href="#" class="selected">
                        <img src="${hamburger}" alt="Hamburger Menu">
                        <span>All Categories</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>Today's Deals</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>Electronics</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>Men</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>Women</span>
                    </a>
                </li>
            </ul>
            <a class="category__cta" href="#">Sell on YourBasket</a>
        </nav>
    </div>
    
    `;
}
