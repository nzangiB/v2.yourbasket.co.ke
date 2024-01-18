import logo from "../../assets/logos/logo-dark.svg"
import search from "../../assets/icons/search.svg"
import profile from "../../assets/icons/profile.svg"
import cart from "../../assets/icons/cart_default.svg"
import customer from "../../assets/icons/customer_care.svg"
import hamburger from "../../assets/icons/hamburger_menu.svg"

import './Nav.scss';

export function Nav (props) {
    return `
    <div class="Nav">
        <div class="Nav__container">
            <div class="Nav__logo">
                <a href="#"><img src=${logo} alt="company logo"></a>
            </div>

            <div class="Nav__search">
                <label for="searchInput"></label>
                <input type="text" id="searchInput" name="q" placeholder="Search products, brands and more">
                <button type="submit"><img src=${search} alt="search icon"></button>
            </div>

            <ul class="Nav__links">
                <li>
                    <a href="#"><img src="${profile}" alt="search icon"><span>Sign In/ Register</span></a>
                </li>
                <li>
                    <a href="#"><img src="${cart}" alt="cart icon"><span>Cart</span></a>
                </li>
                <li>
                    <a href="#"><img src="${customer}" alt="customer icon"><span>Customer Care</span></a>
                </li>
            </ul>
        </div>

        <div class="Categories__container">
            <ul class="Category__links">
                <li><a href="#" class="all"><img src="${hamburger}" alt="Hamburger Menu">All Categories</a></li>
                <li><a href="#">Today's Deals</a></li>
                <li><a href="#">Electronics</a></li>
                <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Sell on YourBasket</a></li>
            </ul>
        </div>
    </div>
    
    `;
}

