import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductRow } from "../productCard/productRow";

import "./search.scss";

const setIdFromSlug = async ({ cats, brands, params }) => {
  let queryData;
  let brand = [];
  const obj = {
    mastCatId: "",
    catId: "",
    subCatId: "",
    brandId: ""
  };

  // check if category..
  if (params.master && params.master.length > 0) {
    const ss = await Promise.all(cats.filter((item, i) => {
      return item.slug === params.master;
    }));

    if (ss.length > 0) {
      obj.mastCatId = ss[0].id;

      /// filter brands...
      brand = await Promise.all(brands.filter((br) => {
        if (br.category_ids) {
          const cat_ids = br.category_ids.split(",");
          if (cat_ids.length > 0 && cat_ids.indexOf(String(ss[0].id)) !== -1) {
            return true;
          }
        }
      }));

      // check sub category..
      if (ss[0].Categories.length > 0 && (params.category && params.category.length > 0)) {
        const ss1 = await Promise.all(ss[0].Categories.filter((item, i) => {
          return item.slug === params.category;
        }));
        if (ss1.length > 0) {
          obj.catId = ss1[0].id;

          // check sub sub category..
          if (ss1[0].Categories.length > 0 && (params.subcategory && params.subcategory.length > 0)) {
            const ss2 = await Promise.all(ss1[0].Categories.filter((item, i) => {
              return item.slug === params.subcategory;
            }));
            if (ss2.length > 0) {
              obj.subCatId = ss2[0].id;
            }
          }
        }
      }
    }
  }

  // check if brand...
  if (params.brand && params.brand.length > 0) {
    const ss = await Promise.all(brands.filter((item, i) => {
      return item.slug == params.brand;
    }));

    if (ss.length > 0) {
      obj.brandId = ss[0].id;
    }
  }

  // check if keyword..
  if (params.keyword && params.keyword.length > 0) {
    obj.keyword = params.keyword;
  }

  // check if keyword..
  if (params.filter && params.filter.length > 0) {
    obj.filter = params.filter;
  }

  queryData = obj;
  return { queryData, brand };
};

const makeBreadcrumb = async ({ masterCatData, cats = [], queryData = {} }, nv = false) => {
  let nvUrl = null;
  let str = "<a href='/'>Home</a>";
  // check master category..
  if (masterCatData.length > 0) cats = masterCatData;

  if (queryData.mastCatId && queryData.mastCatId > 0) {
    const ss = await Promise.all(cats.filter((item, i) => {
      return parseInt(item.id) === parseInt(queryData.mastCatId);
    }));

    if (ss.length > 0) {
      nvUrl = `${ss[0].slug}`;
      str += ` / <a href="/#/${nvUrl}" onclick="setTimeout(function () {window.location.reload(); }, 500);" >${ss[0].name}</a>`;

      // check sub category..
      if (ss[0].Categories.length > 0 && (queryData.catId && queryData.catId > 0)) {
        const ss1 = await Promise.all(ss[0].Categories.filter((item, i) => {
          return parseInt(item.id) === parseInt(queryData.catId);
        }));
        if (ss1.length > 0) {
          nvUrl = `${ss[0].slug}/${ss1[0].slug}`;
          str += ` / <a href="/#/${nvUrl}"  onclick="setTimeout(function () {window.location.reload(); }, 500);">${ss1[0].name}</a>`;

          // check sub sub category..
          if (ss1[0].Categories.length > 0 && (queryData.subCatId && queryData.subCatId > 0)) {
            const ss2 = await Promise.all(ss1[0].Categories.filter((item, i) => {
              return parseInt(item.id) === parseInt(queryData.subCatId);
            }));
            if (ss2.length > 0) {
              nvUrl = `${ss[0].slug}/${ss1[0].slug}/${ss2[0].slug}`;
              str += ` / <a href="/#/${nvUrl}"  onclick="setTimeout(function () {window.location.reload(); }, 500);">${ss2[0].name}</a>`;
            }
          }
        }
      }
      if (nv && nvUrl) {
        navigate("/" + nvUrl);
        window.location.reload();
      }
    }
  } else {
    nvUrl = `product`;
    str += " / " + "<a href='/#/product'>All Categories</a>";
  }
  if (nv && nvUrl) {
    navigate("/" + nvUrl);
    window.location.reload();
  }

  return str;
};

const getData = async (props) => {
  let queryData;
  let cats, masterCatData;
  await DataService.getAllCategory("0").then((data) => {
    masterCatData = data.data.categories;
    cats = data.data.categories;
  });

  let brand, brands;
  await DataService.getAllBrand().then((data) => {
    brand = data.data.data;
    brands = data.data.data;
  });

  const auth = AuthService.getCurrentUser();
  const userId = (auth) ? auth.id : "";

  ({ queryData, brand } = await setIdFromSlug({ cats, brands, ...props }));
  const customBreadcrumb = await makeBreadcrumb({ masterCatData, cats, queryData });

  const products = { list: [], count: 0 };
  await DataService.searchProduct({
    mastCatId: queryData.mastCatId ? (queryData.catId) ? [] : [queryData.mastCatId] : [],
    catId: queryData.catId ? (queryData.subCatId) ? [] : [queryData.catId] : [],
    subCatId: queryData.subCatId ? [queryData.subCatId] : [],
    brandId: queryData.brandId ? [queryData.brandId] : [],
    dates: [],
    keyword: queryData.keyword ? queryData.keyword : "",
    filter: queryData.filter ? queryData.filter : ""
  }, userId).then((data) => {
    products.list = data.data.products;
    products.count = data.data.products_count;
  });

  return {
    customBreadcrumb,
    products,
    brand,
    cats
  };
};

async function SearchFilters ({ filters, ...props }) {
  const { cats, brand } = await getData(props);

  const getSubCategoryFilters = (category) => category.Categories
    ? `
    <div class="options">
      ${category.Categories.map(category => `
        <div class="option">
          <div class="option__name">${category.name}</div>
          ${getSubCategoryFilters(category)}
        </div>
      `).filter(Boolean).join("")}
    </div>
  `
    : "";

  const categoryFilter = cats.length && `
    <section class="filter">
        <header class="filter__title">
            <div class="title">Category</div>
        </header>
        <section class="filter__options">
            <div class="search">
              <input type="text" placeholder="Search " value="">
            </div>
            <div class="options" data-simplebar data-simplebar-auto-hide="false">
               ${cats.map((category) => `
                  <div class="option">
                    <div class="option__name">${category.name}</div>
                    ${getSubCategoryFilters(category)}
                  </div>
              `).filter(Boolean).join("")}
            </div>
        </section>
    </section>
  `;

  const brandFilter = brand.length && `
    <section class="filter">
        <header class="filter__title">
          <div class="title">Brand</div>
        </header>
        <section class="filter__options">
          <div class="search">
            <input type="text" placeholder="Search " value="">
          </div>
          <div class="options" data-simplebar>
            ${brand.map((brand) => `
                <div class="option">
                  <div class="option__name">${brand.name}</div>
                </div>
            `).filter(Boolean).join("")}
          </div>
        </section>
    </section>
  `;

  const priceFilter = `    
    <section class="filter">
        <header class="filter__title">
          <div class="title">Price</div>
        </header>
        <section class="filter__options">
          <div class="inputs">
            <input type="number" name="min" aria-label="min" id="filter-min-input" value="5">
            <span class="between to">To</span>
            <input type="number" name="max" aria-label="max" id="filter-max-input" value="5000">
            <button class="between" type="button" disabled="" id="filter-price-btn">go</button>
          </div>
        </section>
    </section>
  `;

  const dealsFilter = `
    <section class="filter">
        <header class="filter__title">
          <div class="title">Deal</div>
        </header>
        <section class="filter__options">
          <div class="options" data-simplebar>
            <div class="option">Today's Deals</div>
          </div>
        </section>
    </section>
  `;

  const newArrivalFilter = `
    <section class="filter">
        <header class="filter__title">
          <div class="title">New Arrival</div>
        </header>
        <section class="filter__options">
          <div class="options" data-simplebar>
            <div class="option">Last 7 days</div>
            <div class="option">Last 30 days</div>
            <div class="option">Last 60 days</div>
          </div>
        </section>
    </section>
  `;

  const customerReviewFilter = `
    <section class="filter">
        <header class="filter__title">
          <div class="title">Customer Review</div>
        </header>
        <section class="filter__options">
          <div class="options" data-simplebar>
            <div class="option">All stars</div>
            <div class="option">5 stars only</div>
            <div class="option">4 stars only</div>
            <div class="option">3 stars only</div>
            <div class="option">2 stars only</div>
            <div class="option">1 star only</div>
          </div>
        </section>
    </section>
  `;

  const sellerScoreFilter = `
    <section class="filter">
        <header class="filter__title">
          <div class="title">Seller Score</div>
        </header>
        <section class="filter__options">
          <div class="options" data-simplebar>
            <div class="option">80% or more</div>
            <div class="option">60% or more</div>
            <div class="option">40% or more</div>
            <div class="option">20% or more</div>
          </div>
        </section>
    </section>   
  `;

  const filterList = {
    category: categoryFilter,
    brand: brandFilter,
    price: priceFilter,
    deals: dealsFilter,
    newArrival: newArrivalFilter,
    customerReview: customerReviewFilter,
    sellerScore: sellerScoreFilter
  };

  const filtersToRender = filters.map((filter) => {
    return filterList[filter];
  });

  return `
    <aside class="search-filters">
        <div class="filters">
            ${filtersToRender.filter(Boolean).join("")}
        </div>
    </aside>
  `;
}

async function SearchResults (props) {
  const { products } = await getData(props);

  return `
    <div class="search-results">
        <div class="results">
            <header class="results__header">
                <div class="results__title">
                    <div class="title">Results</div>
                    <div class="count">
                        ${products.count ? `Showing 1-12 of ${products.count}` : `0 Results Found`}
                    </div>
                </div>
                <div class="results__sort">
                    <div class="sort__label">Sort by</div>
                    <div class="sort__options">
                        <select onChange={sortProdctByPrice}>
                            <option value="">Recommended</option>
                            <option value="popularity">Popularity</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                            <option value="new">Newest Arrivals</option>
                        </select>
                    </div>
                </div>
            </header>
              
            <section class="results__list">       
                ${new ProductRow(products.list).render()}
            </section>
        </div>
    </div>
  `;
}

export async function Search ({ filters, params, query }) {
  return `
    <div class="search-component">
        ${await SearchFilters({ filters, params, query })}
        ${await SearchResults({ params, query })}
    </div>
  `;
}
