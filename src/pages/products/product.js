import Layout from "./_layout";
import AdultContentWarning from "../../components/adultContentWarning/adultContentWarning";
import { ProductPage } from "../../components/product/productPage";
import { Ad } from "../../components/ad/ad";

import "./product.scss";

import { CATEGORIES_ADULT_CONTENT } from "../../helpers/constants";

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

export default function (props) {
  const { master, category, subcategory } = props.params;
  // if content is adult, show warning
  if (CATEGORIES_ADULT_CONTENT.includes(master)) {
    return (
      <Layout>
        <AdultContentWarning>
          <Product {...props} />
        </AdultContentWarning>
      </Layout>
    );
  }

  return (
    <Layout>
      <Product {...props} />
    </Layout>
  );
}
