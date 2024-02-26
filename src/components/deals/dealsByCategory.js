import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductRow } from "../productCard/productRow";

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
  return `
      <div class="deals-list deals-on-${slug}">
          <header class="deals__header">
              <h3 class="title">${name}</h3>
              <div class="deals__text">
                  <a class="link --see-more" data-route="/categories/${slug}?deals=true">
                      See more
                  </a>
              </div>
          </header>

          <section class="deals__list">
              ${new ProductRow(products).render()}
          </section>
      </div>

      <div class="ad-group --row">
          <div class="ad" style="aspect-ratio: 920/90">
              <img src="https://via.placeholder.com/920x90" class="img" alt="Ad" />
          </div>
      </div>
  `;
};

export async function DealsByCategory () {
  const auth = AuthService.getCurrentUser();
  const userId = (auth) ? auth.id : "";
  const topCategories = await DataService.getHomePageData(userId).then((data) => {
    return data.data.categories;
  });

  if (!topCategories.length) return ``;

  const topCategoriesList = await Promise.all(topCategories.map(topCategory));
  return topCategoriesList.filter(Boolean).join("");
}
