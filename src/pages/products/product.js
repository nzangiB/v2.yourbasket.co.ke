import Layout from "./_layout";
import { ProductPage } from "../../components/product/productPage";
import { Ad } from "../../components/ad/ad";

import "./product.scss";

async function Product (props) {
  return (
    <Layout>
      <div className="container">
        <div className="content">
          <ProductPage {...props}/>
          <div className="ad-group --row">
            <Ad width={920} height={90}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Product;
