import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { MainBanner, SideBanner } from "../carousel/carousel";

import "./hero.scss";

export async function Hero () {
  const auth = AuthService.getCurrentUser();
  const userId = (auth) ? auth.id : "";
  const banners = await DataService.getHomePageData(userId).then((data) => {
    return data.data.banners;
  });

  return `
        <div class="hero">
            <div class="hero-carousel">
                <div class="hero-carousel__main">
                    ${MainBanner(banners[1])}
                </div>

                <div class="hero-carousel__side">
                    ${SideBanner(banners[2])}
                    ${SideBanner(banners[5])}
                </div>
            </div>
        </div>
            
        <!--
            <div class="ad-group --row">
                <div class="ad" style="aspect-ratio: 600/314">
                <img src="https://via.placeholder.com/600x314" class="img" alt="Ad" />
                </div>
                <div class="ad-group --column">
                    <div class="ad" style="aspect-ratio: 320/200">
                    <img src="https://via.placeholder.com/320x200" class="img" alt="Ad" />
                    </div>
                    <div class="ad" style="aspect-ratio: 320/50">
                    <img src="https://via.placeholder.com/320x50" class="img" alt="Ad" />
                    </div>
                </div>
            </div>
        -->
    `;
}
