// payment icons
import gpay from "../../assets/images/gpay.svg"
import aspira from "../../assets/images/aspira.svg"
import visa from "../../assets/images/visa.svg"
import neteller from "../../assets/images/neteller.svg"
import astropay from "../../assets/images/astropay.svg"
// social icons
import facebook from "../../assets/icons/facebook2.svg"
import twitter from "../../assets/icons/twitter2.svg"
import linkedin from "../../assets/icons/linkedin.svg"
import instagram from "../../assets/icons/instagram.svg"

import './Footer.scss';

export function Footer (props) {
    return `
    <div class="footer__container">

        <div class="footer__nav">

            <div class="footer__nav__item">
                <h3>ELECTRONICS</h3>
                <ul>
                    <li><a href="#">Mobiles</a></li>
                    <li><a href="#">Tablets</a></li>
                    <li><a href="#">Laptops</a></li>
                    <li><a href="#">Your Appliances</a></li>
                    <li><a href="#">Camera, Photo &amp; Video</a></li>
                    <li><a href="#">Televisions</a></li>
                    <li><a href="#">Headphones</a></li>
                    <li><a href="#">Video Games</a></li>
                </ul>
            </div>

            <div class="footer__nav__item">
                <h3>HOME AND KITCHEN</h3>
                <ul>
                    <li><a href="#">Bath</a></li>
                    <li><a href="#">Home Decor</a></li>
                    <li><a href="#">Kitchen &amp; Dining</a></li>
                    <li><a href="#">Tools &amp; Home improvement</a></li>
                    <li><a href="#">Camera, Photo &amp; Video</a></li>
                    <li><a href="#">Audio &amp; Video</a></li>
                    <li><a href="#">Furniture</a></li>
                    <li><a href="#">Pet Supplies</a></li>
                </ul>
            </div>

            <div class="footer__nav__item">
                <h3>YOUR KIOSK</h3>
                <ul>
                    <li><a href="#">Fresh produce</a></li>
                    <li><a href="#">Dairy &amp; Eggs</a></li>
                    <li><a href="#">Bread &amp; Bakery</a></li>
                    <li><a href="#">Meat &amp; Seafood</a></li>
                    <li><a href="#">Breakfast food</a></li>
                    <li><a href="#">Pantry samples</a></li>
                    <li><a href="#">Household Supplies</a></li>
                    <li><a href="#">Personal Care</a></li>
                </ul>
            </div>

            <div class="footer__nav__item">
                <h3>FASHION</h3>
                <ul>
                    <li><a href="#">Women's Fashion</a></li>
                    <li><a href="#">Men's Fashion</a></li>
                    <li><a href="#">Girl's Fashion</a></li>
                    <li><a href="#">Boy's Fashion</a></li>
                    <li><a href="#">Watches</a></li>
                    <li><a href="#">Jewellery</a></li>
                    <li><a href="#">Women's Handbags</a></li>
                    <li><a href="#">Men's Eyewear</a></li>
                </ul>
            </div>

            <div class="footer__nav__item">
                <h3>BEAUTY</h3>
                <ul>
                    <li><a href="#">Fragrance</a></li>
                    <li><a href="#">Make-Up</a></li>
                    <li><a href="#">Haircare</a></li>
                    <li><a href="#">Skincare</a></li>
                    <li><a href="#">Bath &amp; Body</a></li>
                    <li><a href="#">Electronic Beauty Tools</a></li>
                    <li><a href="#">Men's Grooming</a></li>
                    <li><a href="#">Health Care Essentials</a></li>
                </ul>
            </div>

            <div class="footer__nav__item">
                <h3>BABY &amp; TOYS</h3>
                <ul>
                    <li><a href="#">Diapering</a></li>
                    <li><a href="#">Baby Transport</a></li>
                    <li><a href="#">Nursing &amp; Feeding</a></li>
                    <li><a href="#">Baby &amp; Kids Fashion</a></li>
                    <li><a href="#">Baby &amp; Toddler Toys</a></li>
                    <li><a href="#">Tricycles &amp; Scooters</a></li>
                    <li><a href="#">Board Games &amp; Cards</a></li>
                    <li><a href="#">Outdoor Play</a></li>
                </ul>
            </div>

            <div class="footer__nav__item">
                <h3>TOP BRANDS</h3>
                <ul>
                    <li><a href="#">Apple</a></li>
                    <li><a href="#">Xiaomi</a></li>
                    <li><a href="#">Samsung</a></li>
                    <li><a href="#">Mika</a></li>
                    <li><a href="#">Tecno</a></li>
                    <li><a href="#">LG</a></li>
                    <li><a href="#">Hisense</a></li>
                    <li><a href="#">TCL</a></li>
                    <li><a href="#">Vitron</a></li>
                </ul>
            </div>


        </div>

        <div class="footer__socials">
            <div class="socials__content">
                <h3>CONNECT WITH US</h3>
                <div class="socials__links">
                    <a href="#"><img src="${facebook}" alt=""></a>
                    <a href="#"><img src="${twitter}" alt=""></a>
                    <a href="#"><img src="${linkedin}" alt=""></a>
                    <a href="#"><img src="${instagram}" alt=""></a>
                </div>
            </div>

            <div class="footer__logos">
                <img src="${visa}" alt="visa logo">
                <img src="${aspira}" alt="aspira logo">
                <img src="${gpay}" alt="google pay logo">
                <img src="${neteller}" alt="neteller logo">
                <img src="${astropay}" alt="astropay logo">
            </div>
        </div>

        

        <div class="footer__links">
            <h3>2023 YOURBASKET. All Rights Reserved</h3>
            <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Sell with us</a></li>
                <li><a href="#">Returns &amp; Refunds Policy</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Cookies Notice</a></li>
                <li><a href="#">My Profile</a></li>
            </ul>
        </div>

    </div>
    `;
}

