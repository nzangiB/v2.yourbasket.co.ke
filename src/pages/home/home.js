import { Hero } from "../../components/hero/hero";
import { TodayDeals } from "../../components/deals/todayDeals";
import { ClearanceDeals } from "../../components/deals/clearanceDeals";
import { CrazyOffers } from "../../components/deals/crazyOffers";
import { LatestProducts } from "../../components/deals/latestProducts";
import { ClearanceSale } from "../../components/deals/clearanceSale";
import { FeaturedBrands } from "../../components/featured/featured";
import { DealsByCategory } from "../../components/deals/dealsByCategory";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";

import "./home.scss";

async function Home (props) {
  return (
    <>
      <Header {...props}/>

      <div className="container">
        <aside className="aside aside__left">
          <div className="ad-group --column">
            <div className="ad" style="aspect-ratio: 160/600">
              <img src={require("../../assets/images/ads/aside-banner-1.png")} className="img" alt="Ad"/>
            </div>
          </div>
        </aside>

        <main className="content">
          <Hero/>
          <TodayDeals/>

          <div className="ad-group --row">
            <div className="ad" style="aspect-ratio: 920/90">
              <img src={require("../../assets/images/ads/middle-banner-1.png")} className="img" alt="Ad"/>
            </div>
          </div>

          <ClearanceDeals/>

          <div className="ad-group --row">
            <div className="ad" style="aspect-ratio: 920/90">
              <img src={require("../../assets/images/ads/middle-banner-2.png")} className="img" alt="Ad"/>
            </div>
          </div>

          <CrazyOffers/>

          <div className="ad-group --row">
            <div className="ad" style="aspect-ratio: 920/90">
              <img src={require("../../assets/images/ads/middle-banner-3.png")} className="img" alt="Ad"/>
            </div>
          </div>

          <LatestProducts/>

          <div className="ad-group --row">
            <div className="ad" style="aspect-ratio: 920/90">
              <img src={require("../../assets/images/ads/middle-banner-4.png")} className="img" alt="Ad"/>
            </div>
          </div>
        </main>

        <aside className="aside aside__right">
          <div className="ad-group --column">
            <div className="ad" style="aspect-ratio: 160/600">
              <img src={require("../../assets/images/ads/aside-banner-2.png")} className="img" alt="Ad"/>
            </div>
          </div>
        </aside>
      </div>

      <ClearanceSale/>

      {/* <div className="ad-group --row"> */}
      {/*  <div className="ad" style="aspect-ratio: 728/90"> */}
      {/*    <img src="https://via.placeholder.com/728x90" className="img" alt="Ad"/> */}
      {/*  </div> */}
      {/*  <div className="ad" style="aspect-ratio: 728/90"> */}
      {/*    <img src="https://via.placeholder.com/728x90" className="img" alt="Ad"/> */}
      {/*  </div> */}
      {/* </div> */}

      <DealsByCategory/>
      <FeaturedBrands/>

      <Footer/>
    </>
  );
}

export default Home;
