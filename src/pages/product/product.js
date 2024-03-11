import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { ProductPage } from "../../components/product/productPage";
import { Advert } from "../../components/advert/advert";

import "./product.scss";

async function Product (props) {
  return (
    <>
      <Header {...props}/>
      <div className="container">
        <div className="content">
          <ProductPage {...props}/>
          <Advert/>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Product;
