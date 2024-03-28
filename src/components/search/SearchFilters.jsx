import { Fragment } from "react";

function SearchFilters ({ categories, clickMasterCat, clickCart, clickSubCat, query, brand, filters, ...props }) {
  const getSubCategoryFilters = (item, catSlug) => {
    return item.Categories && (
      <div className="options">
        {item.Categories.map(subCat => {
          // subCat.slug = catSlug + "/" + subCat.slug;
          return (
            <div
              key={subCat.slug}
              className="option"
              id={"subCat" + subCat.id}
            >
              <div>
                <input
                  value={subCat.id}
                  type="checkbox"
                  onClick={(e) => {
                    clickSubCat(e, subCat.id);
                  }}
                  defaultChecked={
                    !!(query?.subCatId &&
											query?.subCatId ===
											subCat.id)
                  }
                  id={"subCat_" + subCat.id}
                  className="input subCategory"
                  // hidden
                />
                <label
                  htmlFor={"subCat_" + subCat.id}
                  className="custom-label"
                ></label>
                <label
                  htmlFor={"subCat_" + subCat.id}
                  className="option__name"
                >
                  {subCat.name}
                </label>
                {/* <a data-route={subCat.slug} className="option__name"> */}
                {/*  {subCat.name} */}
                {/* </a> */}
              </div>
              {getSubCategoryFilters(subCat, subCat.slug)}
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
            <div
              key={cat.slug}
              className={query?.mastCatId && query?.catId === cat.id ? "option" : "option close"}
              id={"divcat_" + cat.id}
            >
              <div>
                <input
                  value={cat.id}
                  type="checkbox"
                  onClick={(e) => {
                    clickCat(e, cat.id);
                  }}
                  defaultChecked={
                    !!(query?.catId &&
											query?.catId === cat.id)
                  }
                  id={"cat_" + cat.id}
                  className="input category"
                  // hidden
                />
                <label
                  htmlFor={"cat_" + cat.id}
                  className="custom-label"
                ></label>
                <label
                  htmlFor={"cat_" + cat.id}
                  className="option__name"
                >
                  {cat.name}
                </label>
                {/* <a data-route={cat.slug} className="option__name"> */}
                {/*  {cat.name} */}
                {/* </a> */}
              </div>
              {getSubCategoryFilters(cat, cat.slug)}
            </div>
          );
        }).filter(Boolean)}
      </div>
    );
  };

  const categoryFilter = categories.length && (
    <section className="filter">
      <header className="filter__title">
        <div className="title">Category</div>
      </header>
      <section className="filter__options">
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            defaultValue=""
          />
        </div>
        <div className="options">
          {categories.map((mastCat) => {
            // mastCat.slug = '/products/' + mastCat.slug;
            return (
              <div
                key={mastCat.slug}
                className={query?.mastCatId &&
								query?.mastCatId === mastCat.id
                  ? "option"
                  : "option selected"}
                id={"divcat_" + mastCat.id}
              >
                <div>
                  <input
                    value={mastCat.id}
                    defaultChecked={!!(query?.mastCatId && query?.mastCatId === mastCat.id)}
                    type="checkbox"
                    onClick={(e) => {
                      clickMastCat(e, mastCat.id);
                    }}
                    id={"masCat_" + mastCat.id}
                    className="input mastercat"
                    // hidden
                  />
                  <label
                    htmlFor={"masCat_" + mastCat.id}
                    className="custom-label"
                  ></label>
                  <label
                    htmlFor={"masCat_" + mastCat.id}
                    className="option__name"
                  >
                    {mastCat.name}
                  </label>
                  {/* <a data-route={mastCat.slug} className="option__name"> */}
                  {/*  {mastCat.name} */}
                  {/* </a> */}
                </div>
                {getCategoryFilters(mastCat, mastCat.slug)}
              </div>
            );
          }).filter(Boolean)}
        </div>
      </section>
    </section>
  );

  const brandFilter = brand.length && (
    <section className="filter">
      <header className="filter__title">
        <div className="title">Brand</div>
      </header>
      <section className="filter__options">
        <div className="search">
          <input type="text" placeholder="Search"/>
        </div>
        <div className="options">
          {brand.map((brand) => (
            <div key={brand.slug} className="option">
              <div className="option__name">
                {brand.name}
              </div>
            </div>
          )).filter(Boolean)}
        </div>
      </section>
    </section>
  );

  const priceFilter = (
    <section className="filter">
      <header className="filter__title">
        <div className="title">Price</div>
      </header>
      <section className="filter__options">
        <div className="inputs">
          <input
            type="number"
            name="min"
            aria-label="min"
            id="filter-min-input"
            defaultValue={5}
          />
          <span className="between to">To</span>
          <input
            type="number"
            name="max"
            aria-label="max"
            id="filter-max-input"
            defaultValue={5000}
          />
          <button
            className="between"
            type="button"
            disabled=""
            id="filter-price-btn"
          >
						go
          </button>
        </div>
      </section>
    </section>
  );

  const dealsFilter = (
    <section className="filter">
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
    <section className="filter">
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
    <section className="filter">
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
    <section className="filter">
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
    return (
      <Fragment key={index}>
        {filterList[filter]}
      </Fragment>
    );
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
