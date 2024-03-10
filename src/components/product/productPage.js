import { Component } from "@wearearchangel/handcrafted";

import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";

import { ProductDetails } from "./productDetails";
import { RecentlyViewedProducts } from "./recentlyViewedProducts";
import { MoreProductsFromSeller } from "./moreProductsFromSeller";

export class ProductPage extends Component {
  async data () {
    const { params } = this.props;

    const auth = AuthService.getCurrentUser();
    const userId = auth ? auth.id : "";
    const product = await DataService.getProductDetailWithSlug(params.id, userId).then(async (data) => {
      const product = data.data.category;
      product.variant = product?.Variations || [];
      product.images = product?.images
        ? JSON.parse(product?.images)
        : [];

      return product;
    }).catch((error) => {
      console.error(error);
      const resMessage = error.response?.data?.msg || error.msg || error.message || error.toString();
      return { error: resMessage };
    });

    return { product };
  }

  skeleton () {
    return "Loading...";
  }

  template () {
    const { product } = this.state;
    return (
      <>
        <ProductDetails product={product}/>
        {/* {{! ProductPageModal }} */}
        <MoreProductsFromSeller product={product}/>
        <RecentlyViewedProducts product={product}/>
      </>
    );
  }
}
