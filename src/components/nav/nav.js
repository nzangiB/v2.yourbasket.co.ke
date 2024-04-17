import { NavHeader } from "./navHeader";
import { NavCategories } from "./navCategories";

import "./nav.scss";

export function Nav () {
  return (
    <div className="nav">
      <NavHeader/>
      <NavCategories/>
    </div>
  );
}
