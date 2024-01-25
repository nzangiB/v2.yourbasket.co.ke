import ad from "../../assets/images/product-page/ad.png";

import "./advert.scss";

export function Advert (props) {
  return `
    <div class="advert__container">
        <div class="advert__image">
            <p>Sponsored ads</p>
            <img src="${ad}" alt="ad banner">
        </div>
    </div>
    `;
}
