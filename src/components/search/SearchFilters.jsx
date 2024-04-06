function SearchFilters (props) {
  const {
    clickMastCat,
    clickCat,
    clickSubCat,
    clickPrice,
    clickBrand,
    clickDates,
    priceMinHandle,
    priceMaxHandle,
    categories,
    brand,
    filters,
    params,
    query,
    loading
  } = props;

  // if (loading) {
  //   return (
  //     <aside className="search-filters">
  //       <div className="message" role="status">
  //         <span>Loading...</span>
  //       </div>
  //     </aside>
  //   );
  // }

  const getSubCategoryFilters = (item, catSlug) => {
    return item.Categories && (
      <div className="options">
        {item.Categories.map(subCat => {
          // subCat.slug = catSlug + "/" + subCat.slug;
          return (
            <div key={subCat.slug} className="option">
              <div
                className={"option__name  sub-cat-div-list"}
                id={"subCatDiv_" + subCat.id}
              >
                <input
                  type="checkbox"
                  value={subCat.id}
                  onClick={(e) => { clickSubCat(e, subCat.id); }}
                  defaultChecked={
                    !!(query?.subCatId &&
											query?.subCatId ===
											subCat.id)
                  }
                  id={"subCat_" + subCat.id}
                  className="input subCatCheckbox"
                  // hidden
                />
                <label htmlFor={"subCat_" + subCat.id}>
                  {subCat.name}
                </label>
              </div>
              {/* <a */}
              {/*  data-route={subCat.slug} href={subCat.slug} */}
              {/*  className={query?.subCatId && query?.subCatId === subCat.id ? "option__name selected" : "option__name"} */}
              {/* > */}
              {/*  {subCat.name} */}
              {/* </a> */}
              {getSubCategoryFilters(subCat, subCat.slug)}
              {/* {query?.subCatId && query?.subCatId === subCat.id && getSubCategoryFilters(subCat, subCat.slug)} */}
            </div>
          );
        }).filter(Boolean)}
      </div>
    );
  };

  const getCategoryFilters = (item, mastCatSlug) => {
    return item.Categories && (
      <div className="options">
        {item.Categories.map(cat => {
          // cat.slug = mastCatSlug + "/" + cat.slug;
          return (
            <div key={cat.slug} className={"option"}>
              <div className={
                query?.mastCatId && query?.catId === cat.id
                  ? "option__name catList cat-div-list"
                  : "option__name catList cat-div-list close"
              }
							     id={"catDiv_" + cat.id}>
                <input
                  type="checkbox"
                  value={cat.id}
                  onClick={(e) => { clickCat(e, cat.id); }}
                  defaultChecked={
                    !!(query?.catId &&
											query?.catId === cat.id)
                  }
                  id={"cat_" + cat.id}
                  className="input catCheckbox"
                  // hidden
                />
                <label htmlFor={"cat_" + cat.id}>
                  {cat.name}
                </label>
              </div>
              {/* <a */}
              {/*  data-route={cat.slug} href={cat.slug} */}
              {/*  className={query?.catId && query?.catId === cat.id ? "option__name selected" : "option__name"} */}
              {/* > */}
              {/*  {cat.name} */}
              {/* </a> */}
              {getSubCategoryFilters(cat, cat.slug)}
              {/* {query?.catId && query?.catId === cat.id && getSubCategoryFilters(cat, cat.slug)} */}
            </div>
          );
        }).filter(Boolean)}
      </div>
    );
  };

  const getMasterCategoryFilters = (categories) => {
    return categories && (
      <div className="options">
        {categories.map((mastCat) => {
          // mastCat.slug = "/#/products/" + mastCat.slug;
          return (
            <div key={mastCat.slug} className={"option"}>
              <div className={
                query?.mastCatId &&
								query?.mastCatId === mastCat.id
                  ? "option__name master-cat-list"
                  : "option__name master-cat-list close"
              }
							     id={"mastCatDiv_" + mastCat.id}
              >
                <input
                  type="checkbox"
                  value={mastCat.id}
                  defaultChecked={!!(query?.mastCatId && query?.mastCatId === mastCat.id)}
                  onClick={(e) => { clickMastCat(e, mastCat.id); }}
                  id={"masCat_" + mastCat.id}
                  className="input masterCatCheckbox"
                  // hidden
                />
                <label htmlFor={"masCat_" + mastCat.id}>
                  {mastCat.name}
                </label>
              </div>
              {/* <a */}
              {/*  data-route={mastCat.slug} href={mastCat.slug} */}
              {/*  className={query?.mastCatId && query?.mastCatId === mastCat.id ? "option__name selected" : "option__name"} */}
              {/* > */}
              {/*  {mastCat.name} */}
              {/* </a> */}
              {getCategoryFilters(mastCat, mastCat.slug)}
              {/* {query?.mastCatId && query?.mastCatId === mastCat.id && getCategoryFilters(mastCat, mastCat.slug)} */}
            </div>
          );
        }).filter(Boolean)}
      </div>
    );
  };

  const categoryFilter = categories.length && (
    <section className="filter" key={"categoryFilter"}>
      <header className="filter__title">
        <div className="title">Category</div>
      </header>
      <section className="filter__options">
        {/* <div className="search"> */}
        {/*  <input */}
        {/*    type="text" */}
        {/*    placeholder="Search" */}
        {/*    defaultValue="" */}
        {/*  /> */}
        {/* </div> */}
        {getMasterCategoryFilters(categories)}
      </section>
    </section>
  );

  const brandFilter = !loading && brand.length && (
    <section className="filter" key={"brandFilter"}>
      <header className="filter__title">
        <div className="title">Brand</div>
      </header>
      <section className="filter__options">
        {/* <div className="search"> */}
        {/*  <input type="text" placeholder="Search"/> */}
        {/* </div> */}
        <div className="options">
          {brand.map((brand) => (
            <div key={brand.slug} className="option">
              <div className={
                query?.brandId &&
								query?.brandId === brand.id
                  ? "option__name brandList"
                  : "option__name brandList close"
              }
							     id={"brand_div_" + brand.id}
              >
                <input
                  type="checkbox"
                  value={brand.id}
                  defaultChecked={!!(query?.brandId && query?.brandId === brand.id)}
                  onClick={(e) => { clickBrand(e, brand.id); }}
                  id={"brand_" + brand.id}
                  className="input brandCheckbox"
                  // hidden
                />
                <label htmlFor={"brand_" + brand.id}>
                  {brand.name}
                </label>
              </div>
            </div>
          )).filter(Boolean)}
        </div>
      </section>
    </section>
  );

  const priceFilter = (
    <section className="filter" key={"priceFilter"}>
      <header className="filter__title">
        <div className="title">Price</div>
      </header>
      <section className="filter__options">
        <div className="inputs">
          <input
            type="text"
            name="min"
            aria-label="min"
            id="filter-min-input"
            onChange={priceMinHandle}
          />
          <span className="between to">To</span>
          <input
            type="text"
            name="max"
            aria-label="max"
            id="filter-max-input"
            onChange={priceMaxHandle}
          />
          <button
            className="between"
            type="button"
            disabled=""
            id="filter-price-btn"
            onClick={(e) => clickPrice(e)}
          >
            <span>go</span>
          </button>
        </div>
      </section>
    </section>
  );

  const dealsFilter = (
    <section className="filter" key={"dealsFilter"}>
      <header className="filter__title">
        <div className="title">Deal</div>
      </header>
      <section className="filter__options">
        <div className="options">
          <div className="option">Today's Deals</div>
        </div>
      </section>
    </section>
  );

  const newArrivalFilter = (
    <section className="filter" key={"newArrivalFilter"}>
      <header className="filter__title">
        <div className="title">New Arrival</div>
      </header>
      <section className="filter__options">
        <div className="options">
          <div className="option">Last 7 days</div>
          <div className="option">Last 30 days</div>
          <div className="option">Last 60 days</div>
        </div>
      </section>
    </section>
  );

  const customerReviewFilter = (
    <section className="filter" key={"customerReviewFilter"}>
      <header className="filter__title">
        <div className="title">Customer Review</div>
      </header>
      <section className="filter__options">
        <div className="options">
          <div className="option">All stars</div>
          <div className="option">5 stars only</div>
          <div className="option">4 stars only</div>
          <div className="option">3 stars only</div>
          <div className="option">2 stars only</div>
          <div className="option">1 star only</div>
        </div>
      </section>
    </section>
  );

  const sellerScoreFilter = (
    <section className="filter" key={"sellerScoreFilter"}>
      <header className="filter__title">
        <div className="title">Seller Score</div>
      </header>
      <section className="filter__options">
        <div className="options">
          <div className="option">80% or more</div>
          <div className="option">60% or more</div>
          <div className="option">40% or more</div>
          <div className="option">20% or more</div>
        </div>
      </section>
    </section>
  );

  const filterList = {
    category: categoryFilter,
    brand: brandFilter,
    price: priceFilter,
    deals: dealsFilter,
    newArrival: newArrivalFilter,
    customerReview: customerReviewFilter,
    sellerScore: sellerScoreFilter
  };

  const filtersToRender = filters.map((filter, index) => {
    return filterList[filter];
  });

  return (
    <aside className="search-filters">
      <div className="filters">
        {filtersToRender.filter(Boolean)}
      </div>
    </aside>
  );
}

export default SearchFilters;
