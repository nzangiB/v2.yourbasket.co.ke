import HelperService from "../../services/helper.service";

import { ProductRow } from "../productCard/productCards";

import "./recentlyViewedProducts.scss";

export async function RecentlyViewedProducts ({ product }) {
  const recentProducts = HelperService.getRecentProducts();
  HelperService.setRecentProducts(product);

  return (
    <div className="recently-viewed-products">
      <div className="deals-grid">
        <header className="deals__header">
          <div className="deals__title">
            <h3 className={"title"}>Recently Viewed</h3>
          </div>
        </header>

        <section className="deals__list">
          <ProductRow products={recentProducts.slice(0, 4)}/>
        </section>
      </div>
    </div>
  );
}
