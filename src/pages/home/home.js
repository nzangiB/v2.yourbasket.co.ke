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

// import AuthService from "../../services/auth.service";
// import DataService from "../../services/data.service";
//
// const getData = async () => {
//   let allData = {};
//
//   const auth = AuthService.getCurrentUser();
//   const userId = (auth) ? auth.id : "";
//   await DataService.getHomePageData(userId).then((data) => {
//     const { masterCategories: categories, categories: topCategories, banners } = data.data;
//     allData = { banners, categories, topCategories };
//   });
//   await DataService.getHomePageData(userId, 1).then((data) => {
//     const { best_sellers: bestSellers, products } = data.data;
//     allData = { ...allData, bestSellers, products };
//   });
//   await DataService.getHomePageData(userId, 2).then((data) => {
//     const { top_deals: dealToday, brands } = data.data;
//     allData = { ...allData, dealToday, brands };
//   });
//   await DataService.getHomePageData(userId, 3).then((data) => {
//     const { new_arrivals: newArrivals, electronics } = data.data;
//     allData = { ...allData, newArrivals, electronics };
//   });
//
//   return allData;
// };

async function Home (props) {
  return `
    ${await Nav(props)}
    
    <div class="container">
        <aside class="aside aside__left">
            <div class="ad-group --column">
                <div class="ad" style="aspect-ratio: 160/600">
                  <img src="https://via.placeholder.com/160x600" class="img" alt="Ad" />
                </div>
            </div>
        </aside>

        <main class="content">
            ${await Hero(props)}
            ${await TodayDeals(props)}

            <div class="ad-group --row">
                <div class="ad" style="aspect-ratio: 920/90">
                    <img src="https://via.placeholder.com/920x90" class="img" alt="Ad" />
                </div>
            </div>

            ${await ClearanceDeals(props)}

            <div class="ad-group --row">
                <div class="ad" style="aspect-ratio: 920/90">
                    <img src="https://via.placeholder.com/920x90" class="img" alt="Ad" />
                </div>
            </div>

            ${await CrazyOffers(props)}

            <div class="ad-group --row">
                <div class="ad" style="aspect-ratio: 920/90">
                    <img src="https://via.placeholder.com/920x90" class="img" alt="Ad" />
                </div>
            </div>
            
            ${await LatestProducts(props)}

            <div class="ad-group --row">
                <div class="ad" style="aspect-ratio: 920/90">
                    <img src="https://via.placeholder.com/920x90" class="img" alt="Ad" />
                </div>
            </div>
            
            ${await ClearanceSale(props)}

            <div class="ad-group --row">
                <div class="ad" style="aspect-ratio: 728/90">
                  <img src="https://via.placeholder.com/728x90" class="img" alt="Ad" />
                </div>
                <div class="ad" style="aspect-ratio: 728/90">
                  <img src="https://via.placeholder.com/728x90" class="img" alt="Ad" />
                </div>
            </div>
        </main>

        <aside class="aside aside__right">
            <div class="ad-group --column">
                <div class="ad" style="aspect-ratio: 160/600">
                  <img src="https://via.placeholder.com/160x600" class="img" alt="Ad" />
                </div>
            </div>
        </aside>
    </div>

    ${await DealsByCategory(props)}
    ${await FeaturedBrands(props)}
    ${Signup(props)}
    ${Footer()}
  `;
}

export default Home;
