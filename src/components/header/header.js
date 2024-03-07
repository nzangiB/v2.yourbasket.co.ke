import { Categories, NavHeader } from "../nav/nav";

import "./header.scss";

export function Header (props) {
  return (
    <header className="page__header">
      <NavHeader {...props}/>
      <Categories/>
    </header>
  );
}
