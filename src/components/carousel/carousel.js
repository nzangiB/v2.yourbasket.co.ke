import placeholder from "../../assets/images/placeholder.png";

import "./carousel.scss";
import { Component } from "@wearearchangel/handcrafted";

export function Slide (banner) {
  const image = banner.file_path
    ? "https://api.yourbasket.co.ke/" + banner.file_path
    : "../assets/img/slider/slider-1.webp";

  let href = "#";
  if (banner.url) {
    const url = new URL(banner.url);
    href = new URL(url.hash.replace("#", "/categories"), location.origin);
  }

  return (
    <a className="banner" href={href}>
      <div className="banner__img">
        <img src={placeholder} data-flickity-lazyload={image} alt={banner.title} className="img"/>
      </div>
      <div className="srt banner__text">
        <h4 className="">{banner.title}</h4>
        <p className="">{banner.description}</p>
      </div>
    </a>
  );
}

class Carousel extends Component {
  template () {
    const { banners } = this.props;
    if (!banners.length) {
      return (
        <div className="banner">
          <div className="banner__img"></div>
          <div className="banner__text">
            <h4 className="title">No images found</h4>
          </div>
        </div>
      );
    }

    return (
      <div className="carousel">
        {banners.map(Slide).filter(Boolean)}
      </div>
    );

    // return `
    //   <div class="carousel" data-flickity='${JSON.stringify(props)}'>
    //       ${banners.map(Slide).filter(Boolean).join("")}
    //   </div>
    // `;
  }

  controller ({ component }) {
    if (!component) return;
    const Flickity = window.Flickity;
    new Flickity(component, {
      autoPlay: true,
      cellAlign: "left",
      imagesLoaded: true,
      // percentagePosition: true,
      lazyLoad: true,
      contain: true,
      prevNextButtons: true,
      pageDots: true
      // watchCSS: true
    });
  }
}

export function MainBanner ({ banners }) {
  return (
    <div className="main-banner">
      <Carousel banners={banners}/>
    </div>
  );
}

export function SideBanner ({ banners }) {
  return (
    <div className="side-banner">
      <Carousel banners={banners}/>
    </div>
  );
}

export function OfferBanner ({ banners }) {
  return (
    <div className="offer-banner">
      <Carousel banners={banners}/>
    </div>
  );
}

export function VendorBanner ({ banners }) {
  return (
    <div className="vendor-banner">
      <Carousel banners={banners}/>
    </div>
  );
}

export function CategoryBanner ({ banners }) {
  return (
    <div className="category-banner">
      <Carousel banners={banners}/>
    </div>
  );
}

/*
  - 160 × 600 px — Wide Skyscraper
  - 300 × 60 px — Video ads
  - 300 × 250 px — Medium Rectangle
  - 336 × 280 px — Large Rectangle
  - 600 × 314 px — The “1.91:1” aspect ratio
  - 300 × 600 px — Half-Page Ad / Large Skyscraper
  300 × 1050 px — Portrait
  468 × 60 px — Banner
  - 728 × 90 px — Leaderboard
  - 970 × 90 px — Large Leaderboard
  930 × 180 px — Top Banner
  970 × 250 px — Billboard
  980 × 120 px — Panorama
  - 320 × 50 px — Mobile Leaderboard
  - 320 × 100 px — Large Mobile Banner
*/
