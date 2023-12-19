import RightArrow from "../../assets/icons/right_arrow.svg"

import './hero.scss';

export function Hero (props) {
    return `
    <div class="Hero__container">

        <ul class="Hero__nav">
            <li><a href="#" id="main"><span>Electronics &amp; Smartphones</span><img src="${RightArrow}" alt="right arrow"></a></li>
            <li><a href="#">Home &amp; Kitchen</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Health &amp; Beauty</a></li>
            <li><a href="#">Baby products</a></li>
            <li><a href="#">Toys &amp; Games</a></li>
            <li><a href="#">Automotive</a></li>
            <li><a href="#">Sports and Outdoors</a></li>
            <li><a href="#">Power and Electricals</a></li>
            <li><a href="#">Your Kiosk</a></li>
            <li><a href="#">Other Categories</a></li>
        </ul>

       <div class="Hero__carousel">

            <div class="Carousel__banner">
            </div>

            <div class="carousel__side">
                <div class="Carousel__sidebanner">  
                </div>

                <div class="Carousel__sidebanner">   
                </div>
            </div>

       </div>
    </div>
    
    `;
}

