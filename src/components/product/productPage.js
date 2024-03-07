import { Component } from "@wearearchangel/handcrafted";
import DataService from "../../services/data.service";
import placeholder from "../../assets/images/placeholder.png";
import { ProductDetails } from "./productDetails";
import { RelatedProducts } from "./relatedProducts";
import { RecentlyViewedProducts } from "./recentlyViewedProducts";
import { Advert } from "../advert/advert";
import AuthService from "../../services/auth.service";
import { MoreProductsFromSeller } from "./moreProductsFromSeller";

export class ProductPage extends Component {
  async data () {
    const { params } = this.props;

    const auth = AuthService.getCurrentUser();
    const userId = auth ? auth.id : "";
    const product = await DataService.getProductDetailWithSlug(params.id, userId).then(async (data) => {
      console.log(data.data.category);
      const product = data.data.category;
      const productImage = product.file_path
        ? `https://api.yourbasket.co.ke/${product.file_path}`
        : placeholder;
      product.images = product.images
        ? JSON.parse(product?.images)
        : [productImage];
      product.variant = product?.variant
        ? JSON.parse(product?.variant)
        : [productImage];

      return product;
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return {
        error: resMessage
      };
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
        <Advert/>
      </>
    );
  }
}
