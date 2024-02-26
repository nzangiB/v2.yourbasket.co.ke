import { Nav } from "../../components/nav/nav";
import { Footer } from "../../components/footer/footer";
import { Signup } from "../../components/signup/signup";
import { Advert } from "../../components/advert/advert";
import { RecentlyViewed } from "../../components/recentlyViewed";
import { RelatedProducts } from "../../components/relatedProducts";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import "./productPage.scss";

async function ProductPage (props) {
  const { params } = props;
  const auth = AuthService.getCurrentUser();
  const userId = auth ? auth.id : "";

  const data = await DataService.getProductDetailWithSlug(params.id, userId);
  const productData = data.data.category;
  productData.images = productData.images
    ? JSON.parse(productData.images)
    : [];
  productData.variant = productData.variant
    ? JSON.parse(productData.variant)
    : [];
  const product = productData;
  const html = { __html: productData.details };

  return `
      ${await Nav()}
      <div class="container">
          <div class="content">
              {{! ProductInfo }}
              {{! ProductPageModal }}
              ${await RelatedProducts({ productData })}
              ${await RecentlyViewed({ productData })}
              ${Advert()}
          </div>
      </div>
      ${Signup()}
      ${Footer()}
  `;
}

export default ProductPage;
