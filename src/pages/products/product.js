import { ProductPage } from "../../components/product/productPage";
import { Ad } from "../../components/ad/ad";

import "./product.scss";

async function Product (props) {
  return (
    <>
      <div className="container">
        <div className="content">
          <ProductPage {...props}/>
          <div className="ad-group --row">
            <Ad width={920} height={90}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
