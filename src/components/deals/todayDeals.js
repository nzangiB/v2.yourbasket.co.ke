import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import CountDown from "../countDown";

import "./deals.scss";
import { ProductGroup } from "../product/productGroup";
import { Component } from "@wearearchangel/handcrafted";

export class TodayDeals extends Component {
  async data () {
    const auth = AuthService.getCurrentUser();
    const userId = (auth) ? auth.id : "";
    const data = await DataService.searchProduct({
      mastCatId: [],
      catId: [],
      subCatId: [],
      brandId: [],
      dates: [],
      keyword: "",
      filter: "top-deals"
    }, userId);

    return data.data;
  }

  template () {
    const { products } = this.state;

    return (
      <div class="deals-grid deals-today">
        <header class="deals__header">
          <div class="deals__time">
            <div class="deals__title">
              <h3 className="title">Today's Deal</h3>
            </div>
            <button class="deals__text">
              <span id="time"><CountDown/></span>
            </button>
          </div>

          <div class="deals__text">
            <a class="link --see-more" data-route="/product/filter/top-deals">
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
}
