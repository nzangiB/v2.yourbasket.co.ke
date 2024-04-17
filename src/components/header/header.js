import { NavHeader } from "../nav/navHeader";
import { NavCategories } from "../nav/navCategories";
import { Basket } from "../basket/basket";

import "./header.scss";

export function Header (props) {
  return (
    <header className="page__header">
      <NavHeader {...props}/>
      <NavCategories {...props}/>
      <Basket {...props}/>
    </header>
  );
}
