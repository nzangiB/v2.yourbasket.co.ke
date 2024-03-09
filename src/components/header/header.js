import { Categories, NavHeader } from "../nav/nav";
import { Basket } from "../basket/basket";

import "./header.scss";

export function Header (props) {
  return (
    <header className="page__header">
      <NavHeader {...props}/>
      <Categories/>
      <Basket/>
    </header>
  );
}
