import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import "./deals.scss";
import { ProductGroup } from "../productCard/productGroup";

export async function CrazyOffers () {
  const auth = AuthService.getCurrentUser();
  const userId = (auth) ? auth.id : "";
  const data = await DataService.searchProduct({
    mastCatId: [],
    catId: [],
    subCatId: [],
    brandId: [],
    dates: [],
    keyword: "",
    filter: "best-sellers"
  }, userId);

  const { products } = data.data;

  return (
    <div class="deals-grid deals-today">
      <header class="deals__header">
        <div class="deals__time">
          <h3 class="title">Crazy Offers</h3>
        </div>

        <div class="deals__text">
          <a class="link --see-more" data-route="/product/filter/best-sellers">
						See all deals
          </a>
        </div>
      </header>

      <section class="deals__grid">
        <ProductGroup products={products}/>
      </section>
    </div>
  );
}
