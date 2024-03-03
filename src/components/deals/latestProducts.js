import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductGroup } from "../product/productGroup";

import "./deals.scss";

export async function LatestProducts () {
  const auth = AuthService.getCurrentUser();
  const userId = (auth) ? auth.id : "";
  const data = await DataService.searchProduct({
    mastCatId: [],
    catId: [],
    subCatId: [],
    brandId: [],
    dates: [],
    keyword: "",
    filter: ""
  }, userId);

  const { products } = data.data;

  return (
    <div className="deals-grid deals-today">
      <header className="deals__header">
        <div className="deals__time">
          <h3 className="title">Latest Products</h3>
        </div>

        <div className="deals__text">
          <a className="link --see-more" data-route="/product">
						See all deals
          </a>
        </div>
      </header>

      <section className="deals__grid">
        <ProductGroup products={products}/>
      </section>
    </div>
  );
}
