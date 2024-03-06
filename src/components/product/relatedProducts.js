import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductRow } from "./productRow";

export async function RelatedProducts ({ product }) {
  const auth = AuthService.getCurrentUser();
  const userId = auth ? auth.id : "";

  const response = await DataService.getRelatedProducts(product.id, userId);
  const relatedProducts = response.data.relatedProducts;
  const allProducts = response.data.Products;

  return (
    <section className={"related-products"}>
      <div className="deals-grid deals-today">
        <header className="deals__header">
          <div className="deals__title">
            <h3 className="title">More deals for you</h3>
          </div>
        </header>

        <section className="deals__list">
          <ProductRow products={relatedProducts}/>
        </section>
      </div>

      <div className="deals-grid deals-today">
        <header className="deals__header">
          <div className="deals__title">
            <h3 className="title">More items from this seller</h3>
          </div>
        </header>

        <section className="deals__list">
          <ProductRow products={allProducts}/>
        </section>
      </div>
    </section>
  );
}
