import { Component } from "@wearearchangel/handcrafted";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductGroup } from "./productCards";

export class RelatedProducts extends Component {
  async data () {
    const { product } = this.props;
    const auth = AuthService.getCurrentUser();
    const userId = auth ? auth.id : "";

    const response = await DataService.getRelatedProducts(product.id, userId);
    const relatedProducts = response.data.relatedProducts;
    return { relatedProducts };
  }

  template () {
    const { relatedProducts } = this.state;
    return (
      <div className="deals-grid">
        <header className="deals__header">
          <div className="deals__title">
            <h3 className="title">More deals for you</h3>
          </div>
        </header>

        <section className="deals__list">
          <ProductGroup products={relatedProducts}/>
        </section>
      </div>
    );
  }
}
