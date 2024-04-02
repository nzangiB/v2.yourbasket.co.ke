import Layout from "./_layout";
import AdultContentWarning from "../../components/adultContentWarning/adultContentWarning";
import { Breadcrumbs } from "../../components/breadcrumbs/breadcrumbs";
import { Search } from "../../components/search/search";
import { Ad } from "../../components/ad/ad";

import "./products.scss";

import { CATEGORIES_ADULT_CONTENT } from "../../helpers/constants";

function Products (props) {
  const { params, query } = props;
  const filters = ["category", "brand", "price", "deals", "newArrival", "customerReview", "sellerScore"];

  return (
    <>
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
          <Products {...props} />
        </AdultContentWarning>
      </Layout>
    );
  }

  return (
    <Layout>
      <Products {...props} />
    </Layout>
  );
}
