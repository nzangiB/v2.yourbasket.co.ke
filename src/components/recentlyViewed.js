import HelperService from "../services/helper.service";

import { ProductRow } from "./product/productRow";

export async function RecentlyViewed ({ product }) {
  const recentProducts = HelperService.getRecentProducts();
  HelperService.setRecentProducts(product);

  return (
    <div className="deals-grid deals-recommended">
      <header className="deals__header">
        <h3 className="deals__title">Recently Viewed</h3>
      </header>

      <section className="deals__list">
        <ProductRow products={recentProducts.slice(0, 4)}/>
      </section>
    </div>
  );
}
