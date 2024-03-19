// payment icons
import gpay from "../../assets/images/gpay.svg";
import aspira from "../../assets/images/aspira.svg";
import visa from "../../assets/images/visa.svg";
import neteller from "../../assets/images/neteller.svg";
import astropay from "../../assets/images/astropay.svg";
// social icons
import facebook from "../../assets/icons/facebook2.svg";
import twitter from "../../assets/icons/twitter2.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import instagram from "../../assets/icons/instagram.svg";

import { Signup } from "../signup/signup";
import DataService from "../../services/data.service";
import { toast } from "../../plugins/react-toastify";

import "./footer.scss";

function NavFooter () {
  return (
    <nav className="footer__nav">
      <div className="footer__nav--item">
        <h3 className="title">Electronics</h3>
        <ul className="list">
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

      <div className="footer__nav--item">
        <h3 className="title">Home And Kitchen</h3>
        <ul className="list">
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

      <div className="footer__nav--item">
        <h3 className="title">Your Kiosk</h3>
        <ul className="list">
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

      <div className="footer__nav--item">
        <h3 className="title">Fashion</h3>
        <ul className="list">
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

      <div className="footer__nav--item">
        <h3 className="title">Beauty</h3>
        <ul className="list">
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

      <div className="footer__nav--item">
        <h3 className="title">Baby &amp; Toys</h3>
        <ul className="list">
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

      <div className="footer__nav--item">
        <h3 className="title">Top Brands</h3>
        <ul className="list">
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
    </nav>
  );
}

async function NavSocials () {
  const smLinks = await DataService.getSocialLinks().then((data) => {
    return data?.data?.data;
  }).catch((error) => {
    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(resMessage, { position: toast.POSITION.TOP_RIGHT });
  });
  return (
    <nav className="footer__socials">
      <div className="socials__content">
        <h3 className="title">Connect With Us</h3>
        <div className="social-icons">
          <a href={smLinks?.facebook ? smLinks?.facebook : "#"} target="_blank">
            <object data={require("./icons/facebook.svg")} name={"facebook"} type="image/svg+xml"/>
          </a>
          <a href={smLinks?.twitter ? smLinks?.twitter : "#"} target="_blank">
            <object data={require("./icons/twitter.svg")} name={"twitter"} type="image/svg+xml"/>
          </a>
          <a href={smLinks?.instagram ? smLinks?.instagram : "#"} target="_blank">
            <object data={require("./icons/instagram.svg")} name={"instagram"} type="image/svg+xml"/>
          </a>
          <a href={smLinks?.linkedin ? smLinks?.linkedin : "#"} target="_blank">
            <object data={require("./icons/linkedin.svg")} name={"linkedin"} type="image/svg+xml"/>
          </a>
          <a href={smLinks?.tiktok ? smLinks?.tiktok : "#"} target="_blank">
            <object data={require("./icons/tiktok.svg")} name={"tiktok"} type="image/svg+xml"/>
          </a>
        </div>
      </div>

      <div className="socials__content">
        <div className="payment-icons">
          <img src={visa} alt="visa logo"/>
          <img src={aspira} alt="aspira logo"/>
          <img src={gpay} alt="google pay logo"/>
          <img src={neteller} alt="neteller logo"/>
          <img src={astropay} alt="astropay logo"/>
        </div>
      </div>
    </nav>
  );
}

function FooterLinks () {
  return (
    <nav className="footer__links">
      <p>2023 YourBasket. All Rights Reserved</p>
      <ul className="list">
        <li><a href="#">Blog</a></li>
        <li><a href="#">About us</a></li>
        <li><a href="#">Sell with us</a></li>
        <li><a href="#">Returns &amp; Refunds Policy</a></li>
        <li><a href="#">Terms &amp; Conditions</a></li>
        <li><a href="#">Cookies Notice</a></li>
        <li><a href="#">My Profile</a></li>
      </ul>
    </nav>
  );
}

export function Footer () {
  return (
    <footer className="page__footer">
      <Signup/>
      <NavFooter/>
      <NavSocials/>
      <FooterLinks/>
    </footer>
  );
}
