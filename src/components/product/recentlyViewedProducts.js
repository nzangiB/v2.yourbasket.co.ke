import HelperService from "../../services/helper.service";

import { ProductRow } from "./productCards";

export async function RecentlyViewedProducts ({ product }) {
  const recentProducts = HelperService.getRecentProducts();
  HelperService.setRecentProducts(product);

  return (
    <div className="deals-grid deals-recommended">
      <header className="deals__header">
        <div className="deals__title">
          <h3 class={"title"}>Recently Viewed</h3>
        </div>
      </header>

      <section className="deals__list">
        <ProductRow products={recentProducts.slice(0, 4)}/>
      </section>
    </div>
  );
}
