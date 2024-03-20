import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { FeaturedBrands } from "../../components/featured/featured";
import { Breadcrumbs } from "../../components/breadcrumbs/breadcrumbs";
import { Search } from "../../components/search/search";

import "./categories.scss";
import { Ad } from "../../components/ad/ad";

async function Categories (props) {
  const { params, query } = props;
  const filters = ["category", "brand", "price", "deals", "newArrival", "customerReview", "sellerScore"];

  return (
    <>
      <Header {...props}/>

      {/* {Breadcrumbs({ name: "Categories", route: "/categories" }, params)} */}

      <div className="ad-group --row">
        <Ad width={920} height={90}/>
      </div>

      <FeaturedBrands/>

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

      <Footer/>
    </>
  );
}

export default Categories;
