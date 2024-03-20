import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { ProductPage } from "../../components/product/productPage";
import { Ad } from "../../components/ad/ad";

import "./product.scss";

async function Product (props) {
  return (
    <>
      <Header {...props}/>
      <div className="container">
        <div className="content">
          <ProductPage {...props}/>
          <div className="ad-group --row">
            <Ad width={920} height={90}/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Product;
