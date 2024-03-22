import { Component } from "@wearearchangel/handcrafted";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductRow } from "../product/productCards";

import "./deals.scss";
import { Ad } from "../ad/ad";

const topCategory = async ({ name, slug, id }) => {
  const auth = AuthService.getCurrentUser();
  const userId = (auth) ? auth.id : "";
  const data = await DataService.searchProduct({
    mastCatId: id ? [id] : [],
    catId: [],
    subCatId: [],
    brandId: [],
    dates: [],
    keyword: "",
    filter: ""
  }, userId);

  const { products } = data.data;
  return (
    <>
      <div className={"deals-list deals-on-" + slug}>
        <header className="deals__header">
          <div className="deals__title">
            <h3 className="title">{name}</h3>
          </div>
          <div className="deals__text">
            <a className="link --see-more" data-route={"/products/" + slug + "?deals=true"}>
              <span>See more</span>
            </a>
          </div>
        </header>

        <section className="deals__list">
          <ProductRow products={products}/>
        </section>
      </div>

      <div className="ad-group --row">
        <Ad width={920} height={90}/>
      </div>
    </>
  );
};

export class DealsByCategory extends Component {
  async data () {
    const auth = AuthService.getCurrentUser();
    const userId = (auth) ? auth.id : "";
    const topCategories = await DataService.getHomePageData(userId).then((data) => {
      return data.data.categories;
    });
    return { topCategories };
  }

  skeleton () {
    return (
      <div className="deals-list">
        <header className="deals__header">
          <h3 className="title">Loading...</h3>
        </header>
        <section className="deals__list">
          <ProductRow products={Array(10).fill({ skeleton: true })}/>
        </section>
      </div>
    );
  }

  template () {
    const { topCategories } = this.state;
    if (!topCategories.length) return ``;
    return (
      <>
        {topCategories.map(topCategory).filter(Boolean)}
      </>
    );
  }
}
