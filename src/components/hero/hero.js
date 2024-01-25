import "./hero.scss";

export function Hero (props) {
  return `
    <div class="hero">
        <ul class="hero__nav">
            <li>
                <a href="#" class="selected">
                    <span>Electronics &amp; Smartphones</span>
                </a>
            </li>
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

       <div class="hero__carousel">
            <div class="carousel__banner">
            </div>

            <div class="carousel__side">
                <div class="carousel__side-banner">  
                </div>

                <div class="carousel__side-banner">   
                </div>
            </div>
       </div>
    </div>
    
    `;
}
