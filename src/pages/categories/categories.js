import { Nav } from "../../components/nav/nav";
import { Signup } from "../../components/signup/signup";
import { Footer } from "../../components/footer/footer";
import { FeaturedBrands } from "../../components/featured/featured";
import { Breadcrumbs } from "../../components/breadcrumbs/breadcrumbs";
import { CategoryBanner } from "../../components/carousel/carousel";
import { Search } from "../../components/search/search";

import "./categories.scss";

async function Categories (props) {
  const { params, query } = props;
  const filters = ["category", "brand", "price", "deals", "newArrival", "customerReview", "sellerScore"];

  return ` 
      ${await Nav(props)}
      {{! Breadcrumbs({ name: "Categories", route: "/categories" }, params) }}
      
      <div class="ad-group --row">
          <div class="ad" style="aspect-ratio: 920/90">
            <img src="https://via.placeholder.com/920x90" class="img" alt="Ad" />
          </div>
      </div>

      ${await FeaturedBrands()}
      
      <div class="container">
          <main class="content">
              ${await Search({ filters, params, query })}
          </main>
          
          <aside class="aside aside__right">
              <div class="ad-group --column">
                  <div class="ad" style="aspect-ratio: 300/600">
                    <img src="https://via.placeholder.com/300x600" class="img" alt="Ad" />
                  </div>
              </div>
          </aside>
      </div>
      ${Signup()}
      ${Footer()}
  `;
}

export default Categories;
