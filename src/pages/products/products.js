import Layout from "./_layout";
import { Breadcrumbs } from "../../components/breadcrumbs/breadcrumbs";
import { Search } from "../../components/search/search";
import { Ad } from "../../components/ad/ad";

import "./products.scss";

function Products (props) {
  const { params, query } = props;
  const filters = ["category", "brand", "price", "deals", "newArrival", "customerReview", "sellerScore"];

  return (
    <Layout>
      {/* {Breadcrumbs({ name: "Categories", route: "/products" }, params)} */}

      <div className="ad-group --row">
        <Ad width={920} height={90}/>
      </div>

      <div className="container">
        <main className="content">
          <Search {...{ filters, params, query }}/>
        </main>

        <aside className="aside aside__right">
          <div className="ad-group --column">
            <Ad width={300} height={600}/>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export default Products;
