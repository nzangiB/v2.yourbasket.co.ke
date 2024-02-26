import ad from "../../assets/images/product-page/ad.png";

import "./advert.scss";

export function Advert (props) {
  return `
        <div class="ad-group --row">
            <div class="ad" style="aspect-ratio: 970/90">
                <img src="${ad}" class="img" alt="Ad" />
            </div>
        </div>
    `;
}
