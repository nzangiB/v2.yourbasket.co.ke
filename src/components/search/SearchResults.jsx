import { ProductCard } from "../productCard/productCard";
import { Fragment } from "react";

function Results ({ results }) {
  return (
    <div className="product-grid">
      <div className="product-cards-container">
        <div className="product-cards">
          {results.map(product => (
            <Fragment key={product.id}>
              <ProductCard product={product}/>
            </Fragment>
          )).filter(Boolean)}
        </div>
      </div>
    </div>
  );
}

function Pagination ({
  itemsPerPage,
  itemsPerPageOptions,
  currentPage,
  totalPages,
  handleItemsPerPageChange,
  goToPage
}) {
  const pageButtons = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (totalPages > 5) {
    if (currentPage <= 3) {
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    pageButtons.push(
      <button
        key={page}
        onClick={() => goToPage(page)}
        disabled={currentPage === page}
        className={"btn" + (currentPage === page ? " --active" : "")}
      >
        {page}
      </button>
    );
  }

  return (
    <section className="page-filters">
      <div className="page-filters--left">
        {/* Items per page select dropdown */}
        <div className="input-field">
          <select
            className="input"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
								Show {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="page-filters--right">
        {/* Pagination buttons */}
        <div className={"page-filters__pagination"}>
          {/* Previous page button */}
          {currentPage > 1 && (
            <button
              onClick={() => goToPage(currentPage - 1)}
              className={"btn"}
            >
              <span>&lt;</span>
            </button>
          )}

          {/* Page buttons */}
          <div className={"btn-group"}>
            {pageButtons}
          </div>

          {/* Next page button */}
          {currentPage < totalPages && (
            <button
              onClick={() => goToPage(currentPage + 1)}
              className={"btn"}
            >
              <span>&gt;</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function SearchResults ({
  params,
  query,
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
}) {
  return (
    <section className="search-results">
      <div className="results">
        <header className="results__header">
          <div className="results__title">
            <div className="title">Results</div>
            <div className="count">
              {totalRecords ? `Showing ${itemsPerPage} of ${totalRecords}` : `0 Results Found`}
            </div>
          </div>
          <div className="results__sort">
            <div className="sort__label">Sort by</div>
            <div className="sort__options">
              <select onChange={sortProductByPrice}>
                <option value="">Recommended</option>
                <option value="popularity">Popularity</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
                {/* <option value="new">Newest Arrivals</option> */}
              </select>
            </div>
          </div>
        </header>

        <section className="results__list">
          {loading
            ? (
              <div className="loading">
								Loading...
              </div>
            )
            : (
              <>
                <Results results={data}/>
                <Pagination {...{
                  itemsPerPage,
                  itemsPerPageOptions,
                  currentPage,
                  totalPages,
                  handleItemsPerPageChange,
                  goToPage
                }}/>
              </>
            )}
        </section>
      </div>
    </section>
  );
}

export default SearchResults;
