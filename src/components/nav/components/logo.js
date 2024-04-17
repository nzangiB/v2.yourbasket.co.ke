import "./logo.scss";

function Logo () {
  return (
    <div className="logo">
      <a href="/">
        <object
          data={require("../../../assets/logos/logo-dark.svg")}
          name={"Your Basket"}
        />
      </a>
    </div>
  );
}

export default Logo;
