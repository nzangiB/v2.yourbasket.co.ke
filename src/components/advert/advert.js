import Ad from "../../assets/images/productpage/ad.png"

import './advert.scss';

export function Advert (props) {
    return `
    <div class="ad__container">
        <div class="ad__image">
            <p>Sponsored ads</p>
            <img src="${Ad}" alt="ad banner">
        </div>
    </div>
    `;
}

