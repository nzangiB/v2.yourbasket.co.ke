import { Component } from "@wearearchangel/handcrafted";

import rightArrow from "../../assets/icons/arrow_right_blue.svg";
import leftArrow from "../../assets/icons/arrow_left_dark.svg";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { VendorBanner } from "../carousel/carousel";

import "./featured.scss";

function Brand ({ brand }) {
  const image = brand.file_path ? "https://api.yourbasket.co.ke/" + brand.file_path : "";
  return (
    <div className="brand" data-route={"/brands/" + brand.slug}>
      <div className="brand-image">
        {brand.file_path ? <img src={image} className="w-100" alt="" srcSet=""/> : brand.name}
      </div>
      <div className="brand-name srt">
        <span>{brand.name}</span>
      </div>
    </div>
  );
}

class Brands extends Component {
  template () {
    const { brands } = this.props;
    return (
      <>
        {brands.map(brand => <Brand brand={brand}/>).filter(Boolean)}
      </>
    );
  }

  controller () {
    // const cards = document.getElementById(this.id);
    // if (!cards) return;
    //
    // const Flickity = window.Flickity;
    // new Flickity(cards, {
    //   cellAlign: "left",
    //   contain: true,
    //   pageDots: false,
    //   wrapAround: true,
    //   // prevNextButtons: true,
    //   adaptiveHeight: true
    //   // watchCSS: true
    // });
  }
}

export class FeaturedBrands extends Component {
  async data () {
    const auth = AuthService.getCurrentUser();
    const userId = (auth) ? auth.id : "";
    const brands = await DataService.getHomePageData(userId, 2).then((data) => {
      return data.data.brands;
    });

    return { brands };
  }

  template () {
    const { brands } = this.state;
    return (
      <div className="featured">
        <div className="featured__header">
          <div className="featured__title">
            <h3 className="title">Featured Brands</h3>
          </div>
          <div className="categories__arrows">
            {/* <a href="#"><img src={leftArrow} alt="left arrow"></a> */}
            {/* <a href="#"><img src={rightArrow} alt="right arrow"></a> */}
          </div>
        </div>

        <div className="featured__gallery">
          {brands.length ? <Brands brands={brands}/> : "No brands found"}
        </div>
      </div>
    );
  }
}

export function FeaturedText ({ banners }) {
  return `
        <div class="featured">
            <div class="featured__image">
                <div class="carousel">
                    ${new VendorBanner(banners[3]).render()}
                </div>
            </div>

            <div class="featured__text">
                <div class="text__item">
                    <h3>Superior online shopping in the KENYA</h3>
                    <p>
                        As the leading destination for online shopping in KENYA.
                        YourBasket has everything you need under one roof. Whether
                        you’re shopping for the latest electronic products, fashion,
                        homeware, products for kids and babies, books and stationery,
                        sports and health essentials, beauty products, or groceries,
                        we have millions of products at YourBasket. As a customer-centric
                        online store, we make it easier to buy online with flexible payment
                        plans that help you save, along with regular sales across our extensive
                        product range, our easy-to-use shopping app, and so much more.
                        At YourBasket, we work hard to deliver the very best experience
                        for our customers. We deliver to Nairobi, Mombasa and all other
                        cities in Kenya. As a superstore with multiple departments and
                        exceptional customer service, we offer so much more than your
                        average online shop. We go above and beyond to make your shopping
                        experience as stress-free as possible, with products that offer
                        long-term quality. Save time and effort, and enjoy one-stop shopping
                        from the comfort of your home. Shop online and get free shipping on
                        orders over a set amount.
                    </p>
                </div>

                <div class="text__item">
                    <h3>Shop the best products & brands at YourBasket</h3>
                    <p>
                        You’ll find a massive variety of products from top brands at
                        YourBasket. Our electronics category has the latest mobile phones,
                        along with tablets, mobile accessories, laptops, wearable technology
                        such as smartwatches and other wearable devices, headphones (in-ear, wireless and noise-cancelling), a selection of cameras, televisions, video game consoles such as PC and PlayStation, and video games. We have products from Samsung, Xiaomi, Sony, HP, Dell, Huawei, Lenovo, Apple, and many other leading tech brands. We have a large variety of home appliances in the store, from large appliances such as fridges and washing machines to small appliances such as air fryers, coffee makers, irons, heaters, and more. Our furniture range includes beds, sofas and couches, chairs, tables, and other furniture. The home and kitchen category includes everyday essentials such as food storage, cookware, bedding, home improvement supplies and tools, home decor, lighting, and many other must-haves for your home.
                    </p>
                </div>

                <div class="text__item">
                    <h3>Superior online shopping in the KENYA</h3>
                    <p>
                        As the leading destination for online shopping in KENYA.
                        YourBasket has everything you need under one roof. Whether
                        you’re shopping for the latest electronic products, fashion,
                        homeware, products for kids and babies, books and stationery,
                        sports and health essentials, beauty products, or groceries,
                        we have millions of products at YourBasket. As a customer-centric
                        online store, we make it easier to buy online with flexible payment
                        plans that help you save, along with regular sales across our extensive
                        product range, our easy-to-use shopping app, and so much more.
                        At YourBasket, we work hard to deliver the very best experience
                        for our customers. We deliver to Nairobi, Mombasa and all other
                        cities in Kenya. As a superstore with multiple departments and
                        exceptional customer service, we offer so much more than your
                        average online shop. We go above and beyond to make your shopping
                        experience as stress-free as possible, with products that offer
                        long-term quality. Save time and effort, and enjoy one-stop shopping
                        from the comfort of your home. Shop online and get free shipping on
                        orders over a set amount.
                    </p>
                </div>
            </div>
        </div>
    `;
}

export function Featured (props) {
  const hasText = props.hasText || false;
  return (
    <div className="featured">
      <FeaturedBrands/>
      {hasText && <FeaturedText banners={props.banners}/>}
    </div>
  );
}
