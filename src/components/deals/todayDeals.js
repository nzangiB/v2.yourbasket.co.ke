import { Component } from "@wearearchangel/handcrafted";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import CountDown from "../countDown";
import { ProductGroup } from "../product/productCards";

import "./deals.scss";

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
      <div className="deals-grid deals-today">
        <header className="deals__header">
          <div className="deals__time">
            <div className="deals__title">
              <h3 className="title">Today's Deal</h3>
            </div>
            <button className="deals__text">
              <span id="time"><CountDown/></span>
            </button>
          </div>

          <div className="deals__text">
            <a className="link --see-more" data-route="/product/filter/top-deals">
              <span>See all deals</span>
            </a>
          </div>
        </header>

        <section className="deals__grid">
          <ProductGroup products={products}/>
        </section>
      </div>
    );
  }
}
