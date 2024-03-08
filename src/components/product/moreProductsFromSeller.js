import { Component } from "@wearearchangel/handcrafted";
import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductRow } from "./productCards";

export class MoreProductsFromSeller extends Component {
  async data () {
    const { product } = this.props;
    const auth = AuthService.getCurrentUser();
    const userId = auth ? auth.id : "";

    const response = await DataService.getRelatedProducts(product.id, userId);
    const allProducts = response.data.Products;
    return { allProducts };
  }

  template () {
    const { allProducts } = this.state;
    return (
      <div className="deals-grid">
        <header className="deals__header">
          <div className="deals__title">
            <h3 className="title">More items from this seller</h3>
          </div>
        </header>

        <section className="deals__list">
          <ProductRow products={allProducts}/>
        </section>
      </div>
    );
  }
}
