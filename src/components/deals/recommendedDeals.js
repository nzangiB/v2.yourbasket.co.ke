import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductRow } from "../product/productRow";

import "./deals.scss";

export async function RecommendedDeals (props) {
  const { dealRecommended } = props || [];

  return `
      <div class="deals-grid deals-recommended">
            <header class="deals__header">
                <div class="deals__title">
                    <h3 class="title">RECOMMENDED FOR YOU</h3>
                </div>
                <div class="deals__text">
                    <a class="link --see-more" data-route="/categories/deals-recommended">
                        See more
                    </a>
                </div>
            </header>

            <section class="deals__list">
                ${new ProductRow(dealRecommended).render()}
            </section>
      </div>
  `;
}
