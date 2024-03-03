import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductRow } from "../product/productRow";

import "./deals.scss";

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
      <div className="deals-list deals-on-${slug}">
        <header className="deals__header">
          <h3 className="title">{name}</h3>
          <div className="deals__text">
            <a className="link --see-more" data-route="/categories/${slug}?deals=true">
							See more
            </a>
          </div>
        </header>

        <section className="deals__list">
          <ProductRow products={products}/>
        </section>
      </div>

      <div className="ad-group --row">
        <div className="ad" style="aspect-ratio: 920/90">
          <img src="https://via.placeholder.com/920x90" className="img" alt="Ad"/>
        </div>
      </div>
    </>
  );
};

export async function DealsByCategory () {
  const auth = AuthService.getCurrentUser();
  const userId = (auth) ? auth.id : "";
  const topCategories = await DataService.getHomePageData(userId).then((data) => {
    return data.data.categories;
  });

  if (!topCategories.length) return ``;

  const topCategoriesList = await Promise.all(topCategories.map(topCategory));
  return (
    <>
      {topCategoriesList.filter(Boolean)}
    </>
  );
}
