import { createRoot } from "react-dom/client";
import { Component } from "@wearearchangel/handcrafted";

import SearchTpl from "./Search.tpl";

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
  if (params?.master && params?.master.length > 0) {
    const ss = await Promise.all(cats.filter((item, i) => {
      return item.slug === params?.master;
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
      if (ss[0].Categories.length > 0 && (params?.category && params?.category.length > 0)) {
        const ss1 = await Promise.all(ss[0].Categories.filter((item, i) => {
          return item.slug === params?.category;
        }));
        if (ss1.length > 0) {
          obj.catId = ss1[0].id;

          // check sub sub category..
          if (ss1[0].Categories.length > 0 && (params?.subcategory && params?.subcategory.length > 0)) {
            const ss2 = await Promise.all(ss1[0].Categories.filter((item, i) => {
              return item.slug === params?.subcategory;
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
  if (params?.brand && params?.brand.length > 0) {
    const ss = await Promise.all(brands.filter((item, i) => {
      return item.slug === params?.brand;
    }));

    if (ss.length > 0) {
      obj.brandId = ss[0].id;
    }
  }

  // check if keyword..
  if (params?.keyword && params?.keyword.length > 0) {
    obj.keyword = params?.keyword;
  }

  // check if keyword..
  if (params?.filter && params?.filter.length > 0) {
    obj.filter = params?.filter;
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
        location.href = "/" + nvUrl;
      }
    }
  } else {
    nvUrl = `product`;
    str += " / " + "<a href='/#/product'>All Categories</a>";
  }
  if (nv && nvUrl) {
    location.href = "/" + nvUrl;
  }

  return str;
};

const sortProductByPrice = (e) => {
  const value = e.target.value;
  if (value) {
    const url = new URL(window.location.href);
    url.searchParams.set("sort", value);
    location.href = url.pathname + url.search;
  }
};

export class Search extends Component {
  // data = async () => {
  //   const props = this.props;
  //
  //   let queryData;
  //   let cats, masterCatData;
  //   await DataService.getAllCategory("0").then((data) => {
  //     masterCatData = data.data.categories;
  //     cats = data.data.categories;
  //   });
  //
  //   let brand, brands;
  //   await DataService.getAllBrand().then((data) => {
  //     brand = data.data.data;
  //     brands = data.data.data;
  //   });
  //
  //   const auth = AuthService.getCurrentUser();
  //   const userId = (auth) ? auth.id : "";
  //
  //   ({ queryData, brand } = await setIdFromSlug({ cats, brands, ...props }));
  //   const customBreadcrumb = await makeBreadcrumb({ masterCatData, cats, queryData });
  //
  //   const products = { list: [], count: 0 };
  //   await DataService.searchProduct({
  //     mastCatId: queryData.mastCatId ? (queryData.catId) ? [] : [queryData.mastCatId] : [],
  //     catId: queryData.catId ? (queryData.subCatId) ? [] : [queryData.catId] : [],
  //     subCatId: queryData.subCatId ? [queryData.subCatId] : [],
  //     brandId: queryData.brandId ? [queryData.brandId] : [],
  //     dates: [],
  //     keyword: queryData.keyword ? queryData.keyword : "",
  //     filter: queryData.filter ? queryData.filter : ""
  //   }, userId).then((data) => {
  //     products.list = data.data.products;
  //     products.count = data.data.products_count;
  //   });
  //
  //   return {
  //     customBreadcrumb,
  //     products,
  //     brand,
  //     cats
  //   };
  // };

  constructor (props) {
    super(props);

    this.root = null;
  }

  controller ({ component }) {
    if (this.root == null) this.root = createRoot(component);
    this.root.render(<SearchTpl {...this.props} />);
  }
}
