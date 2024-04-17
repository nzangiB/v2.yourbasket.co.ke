import "./searchForm.scss";

function SearchForm (props) {
  const keyUpEvent = (e) => {
    if (e.key === "Enter") {
      // location.href = `/search?q=${e.target.value}`;
      location.href = `/search/${e.target.value}`;
    }
  };

  const submitEvent = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector("input[name=q]");
    // location.href = `/search?q=${searchInput.value}`;
    location.href = `/search/${searchInput.value}`;
  };

  return (
    <form className="search-form" onSubmit={submitEvent}>
      <label htmlFor="searchInput"></label>
      <input
        className="field"
        type="text"
        id="searchInput"
        name="q"
        placeholder="Search products, brands and more"
        defaultValue={props?.params?.keyword}
        onKeyUp={keyUpEvent}
      />
      <button className="button" type="submit">
        <object
          data={require("../../../assets/icons/search.svg")}
          name={"Search"}
        />
      </button>
    </form>
  );
}

export default SearchForm;
