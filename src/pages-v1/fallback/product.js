import Products from "../../pages/products/products";

const routes = [
  {
    path: "/product/:se{/:id}?",
    data: { page: { title: "Product" } },
    template: (props) => {
      const { se } = props.params;
      if (se === "search") {
        // path: "/#/product/search/:keyword?",
        props.query.keyword = props.params.id;
        return Products(props);
      } else if (se === "brand") {
        // path: "/#/product/brand/:brand?",
        props.query.brand = props.params.id;
        return Products(props);
      } else if (se === "filter") {
        // path: "/#/product/filter/:filter?",
        props.query.filter = props.params.id;
        return Products(props);
      } else {
        return Products(props);
      }
    }
  }
];

export default routes;
