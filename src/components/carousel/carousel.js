import placeholder from "../../assets/images/placeholder.png";

import "./carousel.scss";

export function Slide (banner) {
  const image = banner.file_path
    ? `https://api.yourbasket.co.ke/${banner.file_path}`
    : "../assets/img/slider/slider-1.webp";

  return `
      <a class="banner" href="${banner.url}">
          <div class="banner__img">
              <img src="${placeholder}" data-flickity-lazyload="${image}" alt="${banner.title}" class="img"/>
          </div>
          <div class="srt banner__text">
              <h4 class="">${banner.title}</h4>
              <p class="">${banner.description}</p>
          </div>
      </a>
  `;
}

function Carousel (banners) {
  if (!banners.length > 0) {
    return `
        <div class="carousel">
            <div class="banner">
              <div class="banner__img"></div>
              <div class="banner__text">
                  <h4 class="">No images found</div>
              </div>
            </div>
        </div>
    `;
  }

  return `
    <div class="carousel">
        ${banners.map(Slide).filter(Boolean).join("")}
    </div>
  `;

  // return `
  //   <div class="carousel" data-flickity='${JSON.stringify(props)}'>
  //       ${banners.map(Slide).filter(Boolean).join("")}
  //   </div>
  // `;
}

export function MainBanner (props) {
  return `
    <div class="main-banner">
        ${Carousel(props)}
    </div>
  `;
}

export function SideBanner (props) {
  return `
    <div class="side-banner">
        ${Carousel(props)}
    </div>
  `;
}

export function OfferBanner (props) {
  return `
    <div class="offer-banner">
        ${Carousel(props)}
    </div>
  `;
}

export function VendorBanner (props) {
  return `
    <div class="vendor-banner">
        ${Carousel(props)}
    </div>
  `;
}

export function CategoryBanner (props) {
  return `
    <div class="category-banner">
        ${Carousel(props)}
    </div>
  `;
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
