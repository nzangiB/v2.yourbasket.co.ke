import { Nav } from "../../components/nav/nav";
import { Hero } from "../../components/hero/hero";
import { TodayDeals } from "../../components/deals/todayDeals";
import { ClearanceDeals } from "../../components/deals/clearanceDeals";
import { CrazyOffers } from "../../components/deals/crazyOffers";
import { LatestProducts } from "../../components/deals/latestProducts";
import { ClearanceSale } from "../../components/deals/clearanceSale";
import { FeaturedBrands } from "../../components/featured/featured";
import { DealsByCategory } from "../../components/deals/dealsByCategory";
import { Signup } from "../../components/signup/signup";
import { Footer } from "../../components/footer/footer";

import "./home.scss";

async function Home (props) {
  return (
    <>
      <Nav/>

      <div class="container">
        <aside class="aside aside__left">
          <div class="ad-group --column">
            <div class="ad" style="aspect-ratio: 160/600">
              <img src="https://via.placeholder.com/160x600" class="img" alt="Ad"/>
            </div>
          </div>
        </aside>

        <main class="content">
          <Hero/>
          <TodayDeals/>

          <div class="ad-group --row">
            <div class="ad" style="aspect-ratio: 920/90">
              <img src="https://via.placeholder.com/920x90" class="img" alt="Ad"/>
            </div>
          </div>

          <ClearanceDeals/>

          <div class="ad-group --row">
            <div class="ad" style="aspect-ratio: 920/90">
              <img src="https://via.placeholder.com/920x90" class="img" alt="Ad"/>
            </div>
          </div>

          <CrazyOffers/>

          <div class="ad-group --row">
            <div class="ad" style="aspect-ratio: 920/90">
              <img src="https://via.placeholder.com/920x90" class="img" alt="Ad"/>
            </div>
          </div>

          <LatestProducts/>

          <div class="ad-group --row">
            <div class="ad" style="aspect-ratio: 920/90">
              <img src="https://via.placeholder.com/920x90" class="img" alt="Ad"/>
            </div>
          </div>
        </main>

        <aside class="aside aside__right">
          <div class="ad-group --column">
            <div class="ad" style="aspect-ratio: 160/600">
              <img src="https://via.placeholder.com/160x600" class="img" alt="Ad"/>
            </div>
          </div>
        </aside>
      </div>

      <ClearanceSale/>

      {/* <div class="ad-group --row"> */}
      {/*  <div class="ad" style="aspect-ratio: 728/90"> */}
      {/*    <img src="https://via.placeholder.com/728x90" class="img" alt="Ad"/> */}
      {/*  </div> */}
      {/*  <div class="ad" style="aspect-ratio: 728/90"> */}
      {/*    <img src="https://via.placeholder.com/728x90" class="img" alt="Ad"/> */}
      {/*  </div> */}
      {/* </div> */}

      <DealsByCategory/>
      <FeaturedBrands/>
      <Signup/>
      <Footer/>
    </>
  );
}

export default Home;
