import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { MainBanner, SideBanner } from "../carousel/carousel";

import "./hero.scss";
import { Component } from "@wearearchangel/handcrafted";

export class Hero extends Component {
  async data () {
    const auth = AuthService.getCurrentUser();
    const userId = (auth) ? auth.id : "";
    const banners = await DataService.getHomePageData(userId).then((data) => {
      return data.data.banners;
    });

    return { banners };
  }

  template () {
    const { banners } = this.state;

    return (
      <>
        <div className="hero-carousel">
          <div className="hero-carousel__main">
            <MainBanner banners={banners[1]}/>
          </div>

          <div className="hero-carousel__side">
            <SideBanner banners={banners[2]}/>
            <SideBanner banners={banners[5]}/>
          </div>
        </div>

        {/* <div class="ad-group --row"> */}
        {/*  <div class="ad" style="aspect-ratio: 600/314"> */}
        {/*    <img src="https://via.placeholder.com/600x314" class="img" alt="Ad"/> */}
        {/*  </div> */}
        {/*  <div class="ad-group --column"> */}
        {/*    <div class="ad" style="aspect-ratio: 320/200"> */}
        {/*      <img src="https://via.placeholder.com/320x200" class="img" alt="Ad"/> */}
        {/*    </div> */}
        {/*    <div class="ad" style="aspect-ratio: 320/50"> */}
        {/*      <img src="https://via.placeholder.com/320x50" class="img" alt="Ad"/> */}
        {/*    </div> */}
        {/*  </div> */}
        {/* </div> */}
      </>
    );
  }
}
