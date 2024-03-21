import Layout from "./_layout";
import { Hero } from "../../components/hero/hero";
import { TodayDeals } from "../../components/deals/todayDeals";
import { ClearanceDeals } from "../../components/deals/clearanceDeals";
import { CrazyOffers } from "../../components/deals/crazyOffers";
import { LatestProducts } from "../../components/deals/latestProducts";
import { ClearanceSale } from "../../components/deals/clearanceSale";
import { FeaturedBrands } from "../../components/featured/featured";
import { DealsByCategory } from "../../components/deals/dealsByCategory";
import { Ad } from "../../components/ad/ad";

import "./home.scss";

function Home (props) {
  return (
    <Layout>
      <div className="container">
        <aside className="aside aside__left">
          <div className="ad-group --column">
            <Ad src={require("../../assets/images/ads/aside-banner-1.png")} width={160} height={600}/>
          </div>
        </aside>

        <main className="content">
          <Hero/>
          <TodayDeals/>

          <div className="ad-group --row">
            <Ad src={require("../../assets/images/ads/middle-banner-1.png")} width={920} height={90}/>
          </div>

          <ClearanceDeals/>

          <div className="ad-group --row">
            <Ad src={require("../../assets/images/ads/middle-banner-2.png")} width={920} height={90}/>
          </div>

          <CrazyOffers/>

          <div className="ad-group --row">
            <Ad src={require("../../assets/images/ads/middle-banner-3.png")} width={920} height={90}/>
          </div>

          <LatestProducts/>

          <div className="ad-group --row">
            <Ad src={require("../../assets/images/ads/middle-banner-4.png")} width={920} height={90}/>
          </div>
        </main>

        <aside className="aside aside__right">
          <div className="ad-group --column">
            <Ad src={require("../../assets/images/ads/aside-banner-2.png")} width={160} height={600}/>
          </div>
        </aside>
      </div>

      {/* <ClearanceSale/> */}
      <DealsByCategory/>
      <FeaturedBrands/>
    </Layout>
  );
}

/**
 * 01 Home
 * .0 Landing Page
 * .1 Landing Page [Search]
 */
const routes = [
  {
    path: "/",
    data: { page: { title: "Online Shopping for Furniture, Appliances & More!" } },
    template: Home
  }
];

export default routes;
