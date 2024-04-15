import { Fragment, useEffect, useRef, useState } from "react";

import DataService from "../../services/data.service";
import AuthService from "../../services/auth.service";

import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";

import "./search.scss";

function SearchTpl ({ filters, params, query }) {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [mastCatData, setMastCatData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [searchKey, setSearchKey] = useState("");
  // const [searchParams, setSearchParams] = useSearchParams();
  const [customBreadcrumb, setCustomBreadcrumb] = useState("");
  const [queryData, setQueryData] = useState({
    mastCatId: "",
    catId: "",
    subCatId: "",
    brandId: ""
  });
  const itemsPerPageOptions = [12, 24, 36]; // Available options for items per page

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const limit = useRef(12);

  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  let mastCatId = [];
  let catId = [];
  let subCatId = [];
  let brandId = [];
  let dates = [];
  let breadC = { master: "", cat: "", sub: "" };
  let minPrice;
  let maxPrice;
  let sortByPrice = "";
  let pageNo = 1;

  const setIdFromSlug = async (cats, brands) => {
    let ss;
    const obj = {
      mastCatId: "",
      catId: "",
      subCatId: "",
      brandId: ""
    };

    // check if category.
    if (params.master && params.master.length > 0) {
      ss = await Promise.all(cats.filter((item, i) => {
        return (item.slug === params.master);
      }));

      if (ss.length > 0) {
        obj.mastCatId = ss[0].id;

        /// filter brands...
        const newBrands = await Promise.all(brands.filter((br) => {
          if (br.category_ids) {
            const cat_ids = br.category_ids.split(",");
            if (cat_ids.length > 0 && cat_ids.indexOf(String(ss[0].id)) !== -1) {
              return true;
            }
          }
        }));
        setBrand(newBrands);

        // check sub category..
        if (ss[0].Categories.length > 0 && (params.category && params.category.length > 0)) {
          const ss1 = await Promise.all(ss[0].Categories.filter((item, i) => {
            return (item.slug === params.category);
          }));
          if (ss1.length > 0) {
            obj.catId = ss1[0].id;

            // check sub sub category..
            if (ss1[0].Categories.length > 0 && (params.subcategory && params.subcategory.length > 0)) {
              const ss2 = await Promise.all(ss1[0].Categories.filter((item, i) => {
                return (item.slug === params.subcategory);
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
      ss = await Promise.all(brands.filter((item, i) => {
        return (item.slug === params.brand);
      }));

      if (ss.length > 0) {
        obj.brandId = ss[0].id;
      }
    }

    // check if keyword.
    if (params.keyword && params.keyword.length > 0) {
      obj.keyword = params.keyword;
    }

    // check if keyword.
    if (params.filter && params.filter.length > 0) {
      obj.filter = params.filter;
    }

    setQueryData(obj);
    return obj;
  };

  const makeBreadcrumb = async (obj, mArray = [], nv = false) => {
    let nvUrl = null;
    const nvParams = {};
    let str = "<a href='/'>Home</a>";
    // check master category..
    if (mastCatData.length > 0) {
      mArray = mastCatData;
    }

    if (obj.mastCatId && obj.mastCatId > 0) {
      const ss = await Promise.all(mArray.filter((item, i) => {
        return (parseInt(item.id) === parseInt(obj.mastCatId));
      }));

      if (ss.length > 0) {
        nvParams.mastCatId = ss[0].id;
        nvUrl = `/products/${ss[0].slug}`;
        str += `<div class="breadcrumb-spacer">></div><a class="breadcrumb" href="${nvUrl}">{ss[0].name}</a>`;

        // check sub category..
        if (ss[0].Categories.length > 0 && (obj.catId && obj.catId > 0)) {
          const ss1 = await Promise.all(ss[0].Categories.filter((item, i) => {
            return (parseInt(item.id) === parseInt(obj.catId));
          }));

          if (ss1.length > 0) {
            nvParams.mastCatId = ss[0].id;
            nvParams.catId = ss1[0].id;
            nvUrl = `/products/${ss[0].slug}/${ss1[0].slug}`;
            str += `<div class="breadcrumb-spacer">></div><a class="breadcrumb" href="${nvUrl}">${ss1[0].name}</a>`;

            // check sub sub category..
            if (ss1[0].Categories.length > 0 && (obj.subCatId && obj.subCatId > 0)) {
              const ss2 = await Promise.all(ss1[0].Categories.filter((item, i) => {
                return (parseInt(item.id) === parseInt(obj.subCatId));
              }));

              if (ss2.length > 0) {
                nvParams.mastCatId = ss[0].id;
                nvParams.catId = ss1[0].id;
                nvParams.subCatId = ss2[0].id;
                nvUrl = `/products/${ss[0].slug}/${ss1[0].slug}/${ss2[0].slug}`;
                str += `<div class="breadcrumb-spacer">></div><a class="breadcrumb" href="${nvUrl}">${ss2[0].name}</a>`;
              }
            }
          }
        }

        if (nv && nvUrl) {
          setQueryData(nvParams);
          window.history.replaceState(nvParams, "", nvUrl);
          // window.location.reload();
        }
      }
    } else {
      nvUrl = `/products/`;
      str += `<div class="breadcrumb-spacer">></div><a href="${nvUrl}">All Categories</a>`;
    }

    if (nv && nvUrl) {
      setQueryData(nvParams);
      window.history.replaceState(nvParams, "", nvUrl);
      // window.location.reload();
    }

    setCustomBreadcrumb(str);
  };

  const searchProduct = async (data) => {
    const auth = AuthService.getCurrentUser();
    const userId = (auth) ? auth.id : "";
    await DataService.searchProduct(data, userId).then((data) => {
      setData(data.data.products);
      setTotalRecords(data.data.products_count);
    });
    window.scrollTo(0, 0);
  };

  const goToPage = (page) => {
    pageNo = page;
    setCurrentPage(page);
    selectFilterData();
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    limit.current = newItemsPerPage;

    pageNo = 1;
    setCurrentPage(1);
    selectFilterData();
  };

  const filterData = async (nv = false) => {
    searchProduct({
      dates,
      brandId,
      mastCatId,
      catId,
      subCatId,
      minPrice,
      maxPrice,
      priceSort: sortByPrice,
      keyword: params?.keyword,
      filter: params?.filter,
      page: pageNo,
      limit: limit.current
    });

    if (nv) {
      makeBreadcrumb(
        {
          mastCatId: breadC.master,
          catId: breadC.cat,
          subCatId: breadC.sub
        },
        catData,
        nv
      );
    }
  };

  const clickMastCat = (e, id) => {
    if (e.target.checked) {
      document.getElementById("mastCatDiv_" + id).classList.remove("close");
    } else {
      const catCheckboxes = document.querySelectorAll(".catCheckbox");
      catCheckboxes.forEach((element) => {
        element.checked = false;
      });

      const subCheckboxes = document.querySelectorAll(".subCatCheckbox");
      subCheckboxes.forEach((element) => {
        element.checked = false;
      });

      const catDiv = document.querySelectorAll(".catDivList");
      catDiv.forEach((element) => {
        element.classList.add("close");
      });

      document.getElementById("mastCatDiv_" + id).classList.add("close");
    }

    unSelectAllExcept(".mastCatCheckbox", e.target);
    selectFilterData(true);
  };

  const clickCat = (e, id) => {
    if (e.target.checked) {
      document.getElementById("catDiv_" + id).classList.remove("close");
    } else {
      const subCatCheckboxes = document.querySelectorAll(".subCatCheckbox");
      subCatCheckboxes.forEach((c) => {
        c.checked = false;
      });

      document.getElementById("catDiv_" + id).classList.add("close");
    }

    unSelectAllExcept(".catCheckbox", e.target);
    selectFilterData(true);
  };

  const clickSubCat = (e, id) => {
    unSelectAllExcept(".subCatCheckbox", e.target);
    selectFilterData(true);
  };

  const clickBrand = (e, id) => {
    selectFilterData();
  };

  const clickDates = (e, id) => {
    selectFilterData();
  };

  const clickPrice = (e) => {
    e.preventDefault();
    selectFilterData();
  };

  const getData = async () => {
    setLoading(true);

    let cats = [];
    let brands = [];
    await DataService.getAllCategory("0").then((data) => {
      setMastCatData(data.data.categories);
      cats = data.data.categories;
    });

    await DataService.getAllBrand().then((data) => {
      setBrand(data.data.data);
      brands = data.data.data;
    });

    await setIdFromSlug(cats, brands).then(async (data) => {
      await makeBreadcrumb(data, cats);
      await searchProduct({
        mastCatId: (data.mastCatId) ? (data.catId) ? [] : [data.mastCatId] : [],
        catId: (data.catId) ? (data.subCatId) ? [] : [data.catId] : [],
        subCatId: (data.subCatId) ? [data.subCatId] : [],
        brandId: (data.brandId) ? [data.brandId] : [],
        dates: [],
        keyword: (data.keyword) ? data.keyword : "",
        filter: (data.filter) ? data.filter : ""
      });
    });

    setLoading(false);
  };

  const priceMinHandle = (e) => {
    minPrice = e.target.value;
  };

  const priceMaxHandle = (e) => {
    maxPrice = e.target.value;
  };

  const sortProductByPrice = (e) => {
    sortByPrice = e.target.value;
    selectFilterData();
  };

  const unSelectAllExcept = (className, current = null) => {
    const checkboxes = document.querySelectorAll(className);
    checkboxes.forEach((element) => {
      if (element !== current) {
        element.checked = false;

        // find all categories.
        let list =
					element.parentNode.parentNode.getElementsByClassName("catCheckbox");
        if (list && list.length > 0) {
          for (let i = 0; i < list.length; i++) {
            list[i].checked = false;
          }
        }

        // find all categories.
        list = element.parentNode.parentNode.getElementsByClassName("subCatCheckbox");
        if (list && list.length > 0) {
          for (let i = 0; i < list.length; i++) {
            list[i].checked = false;
          }
        }

        element.parentNode.classList.add("close");
      }
    });
  };

  const selectFilterData = (nv = false) => {
    mastCatId = [];
    catId = [];
    subCatId = [];
    brandId = [];
    dates = [];
    breadC = { master: "", cat: "", sub: "" };
    const mastCatCheckboxes = document.querySelectorAll(".mastCatCheckbox:checked");
    // console.log(mastCatCheckboxes);
    const catCheckboxes = document.querySelectorAll(".catCheckbox:checked");
    // console.log(catCheckboxes);
    const subCatCheckboxes = document.querySelectorAll(".subCatCheckbox:checked");
    // console.log(subCatCheckboxes);
    const brandCheckboxes = document.querySelectorAll(".brandCheckbox:checked");
    // console.log(brandCheckboxes);
    const dateCheckboxes = document.querySelectorAll(".dateCheckbox:checked");
    // console.log(dateCheckboxes);

    mastCatCheckboxes.forEach((element) => {
      if (mastCatId.indexOf(element.value) <= -1) {
        let allowed = true;
        const list = element.parentNode.parentNode.getElementsByClassName("catCheckbox");
        if (list && list.length > 0) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].checked) allowed = false;
          }
        }
        if (allowed) mastCatId.push(element.value);
        breadC.master = element.value;
      }
    });

    catCheckboxes.forEach((element) => {
      if (catId.indexOf(element.value) <= -1) {
        let allowed = true;
        const list = element.parentNode.parentNode.getElementsByClassName("subCatCheckbox");
        if (list && list.length > 0) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].checked) allowed = false;
          }
        }
        if (allowed) catId.push(element.value);
        breadC.cat = element.value;
      }
    });
    subCatCheckboxes.forEach((element) => {
      if (subCatId.indexOf(element.value) <= -1) {
        subCatId.push(element.value);
        breadC.sub = element.value;
      }
    });
    brandCheckboxes.forEach((element) => {
      if (brandId.indexOf(element.value) <= -1) {
        brandId.push(element.value);
      }
    });
    dateCheckboxes.forEach((element) => {
      if (dates.indexOf(element.value) <= -1) {
        dates.push(element.value);
      }
    });

    filterData(nv);
  };

  useEffect(() => {
    getData();
  }, [params]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <section className="search__header"> */}
      {/*  <div className="breadcrumbs"> */}
      {/*    {customBreadcrumb.map((breadcrumb, i) => ( */}
      {/*      <a key={i} className="breadcrumb" data-route={breadcrumb.url}> */}
      {/*        <span>{breadcrumb.name}</span> */}
      {/*      </a> */}
      {/*    )).join("/")} */}
      {/*  </div> */}
      {/* </section> */}
      <section className="search__content">
        <SearchFilters {...{
          clickMastCat,
          clickCat,
          clickSubCat,
          clickPrice,
          clickBrand,
          clickDates,
          priceMinHandle,
          priceMaxHandle,
          categories: mastCatData,
          brand,
          filters,
          params,
          query: queryData,
          loading
        }}/>
        <SearchResults {...{
          params,
          query: queryData,
          data,
          itemsPerPage,
          itemsPerPageOptions,
          currentPage,
          totalPages,
          handleItemsPerPageChange,
          goToPage,
          sortProductByPrice,
          totalRecords,
          loading
        }}/>
      </section>
    </>
  );
}

export default SearchTpl;
