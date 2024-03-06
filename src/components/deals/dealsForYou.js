import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductRow } from "../product/productRow";

import "./deals.scss";

export async function DealsForYou (props) {
  const { dealForYou } = props || [];

  return `
      <div class="deals-grid deals-for-you">
            <header class="deals__header">
                <div class="deals__title">
                    <h3 class="title">BEST DEALS FOR YOU</h3>
                </div>
                <div class="deals__text">
                    <a class="link --see-more" data-route="/categories/deals-for-you">
                        See more
                    </a>
                </div>
            </header>

            <section class="deals__list">
                ${new ProductRow(dealForYou).render()}
            </section>
      </div>
  `;
}
