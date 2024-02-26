import { Nav } from "../../components/nav/nav";
import { Signup } from "../../components/signup/signup";
import { Footer } from "../../components/footer/footer";
import { ProductRow } from "../../components/productCard/productCards";
import { Breadcrumbs } from "../../components/breadcrumbs/breadcrumbs";

import "./brands.scss";
import { Search } from "../../components/search/search";

async function Brands (props) {
  const { params } = props;

  return ` 
      ${Nav(props)}
      ${Breadcrumbs({ name: "Categories", route: "/categories" }, params)}
      <div class="ad-group --row">
          <div class="ad" style="aspect-ratio: 920/90">
            <img src="https://via.placeholder.com/920x90" class="img" alt="Ad" />
          </div>
      </div>
      
      <div class="container">          
          <main class="content">
              ${await Search({ filters: ["brand"] })}
          </main>
        
          <aside class="aside aside__right">
              <div class="ad-group --column">
                  <div class="ad" style="aspect-ratio: 300/600">
                    <img src="https://via.placeholder.com/300x600" class="img" alt="Ad" />
                  </div>
              </div>
          </aside>
      </div>
      
      <div class="deals">
          <div class="deals-recommended">
              <header class="deals__header">
                  <h3 class="deals__title">RECENTLY VIEWED</h3>
              </header>
              ${ProductRow()}
          </div>
      </div>
      
      <div class="ad-group --row">
          <div class="ad" style="aspect-ratio: 920/90">
            <img src="https://via.placeholder.com/920x90" class="img" alt="Ad" />
          </div>
      </div>
      ${Signup()}
      ${Footer()}
  `;
}

export default Brands;
