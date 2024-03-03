import AuthService from "../services/auth.service";
import DataService from "../services/data.service";

import { ProductRow } from "./productCard/productRow";

export async function RelatedProducts ({ productData }) {
  const auth = AuthService.getCurrentUser();
  const userId = auth ? auth.id : "";

  const de = await DataService.getRelatedProducts(productData.id, userId);
  const relatedProducts = de.data.relatedProducts;
  const allProducts = de.data.Products;

  return (
    <>
      <div className="deals-grid deals-today">
        <header className="deals__header">
          <div className="deals__time">
            <h3 className="deals__title">More deals for you</h3>
          </div>
        </header>

        <section className="deals__list">
          <ProductRow products={relatedProducts}/>
        </section>
      </div>

      <div className="deals-grid deals-today">
        <header className="deals__header">
          <div className="deals__time">
            <h3 className="deals__title">More items from this seller</h3>
          </div>
        </header>

        <section className="deals__list">
          <ProductRow products={allProducts}/>
        </section>
      </div>
    </>
  );
}
