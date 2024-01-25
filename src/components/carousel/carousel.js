import banner from "../../assets/images/banner.png";

import "./carousel.scss";

export function Carousel (props) {
  return `
    <div class="carousel">
        <div class="carousel__item">
            <img src="${banner}" alt="banner image" class="img">
        </div>
        <div class="carousel__arrows">
            
        </div>
    </div>
    `;
}
