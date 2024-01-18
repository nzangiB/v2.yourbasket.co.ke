import ad from "../../assets/images/product-page/ad.png"

import "./advert.scss";

export function Advert (props) {
    return `
    <div class="ad__container">
        <div class="ad__image">
            <p>Sponsored ads</p>
            <img src="${ad}" alt="ad banner">
        </div>
    </div>
    `;
}

