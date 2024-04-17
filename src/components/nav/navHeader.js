import { Component } from "@wearearchangel/handcrafted";

import Logo from "./components/logo";
import SearchForm from "./components/searchForm";
import SupportLinks from "./components/supportLinks";

import "./navHeader.scss";

export class NavHeader extends Component {
  skeleton () {
    return (
      <>
        <div className="logo">
          <div className="skeleton skeleton__logo"></div>
        </div>
        <div className="search-form">
          <div className="skeleton skeleton__search"></div>
        </div>
        <div className="support-links">
          <div className="skeleton skeleton__links"></div>
        </div>
      </>
    );
  }

  template () {
    const props = this.props;
    return (
      <>
        <Logo {...props}/>
        <SearchForm {...props}/>
        <SupportLinks {...props}/>
      </>
    );
  }
}
