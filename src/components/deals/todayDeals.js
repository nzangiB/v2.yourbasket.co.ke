import { Component } from "@wearearchangel/handcrafted";

import AuthService from "../../services/auth.service";
import DataService from "../../services/data.service";

import { ProductGroup } from "../productCard/productCards";

import "./deals.scss";

const getRelativeTimeFormat = (diffInMilliseconds) => {
  const seconds = Math.abs(diffInMilliseconds) / 1000;

  let time;
  if (seconds < 60) {
    time = { value: Math.round(seconds), unit: "second" };
  } else if (seconds < 3600) {
    time = { value: Math.round(seconds / 60), unit: "minute" };
  } else if (seconds < 86400) {
    time = { value: Math.round(seconds / 3600), unit: "hour" };
  } else if (seconds < 604800) {
    time = { value: Math.round(seconds / 86400), unit: "day" };
  } else if (seconds < 2629800) {
    time = { value: Math.round(seconds / 604800), unit: "week" };
  } else if (seconds < 31557600) {
    time = { value: Math.round(seconds / 2629800), unit: "month" };
  } else {
    time = { value: Math.round(seconds / 31557600), unit: "year" };
  }

  time.value = diffInMilliseconds < 0 ? -time.value : time.value;
  return time;
};

const getRelativeTime = (dateTime) => {
  const timeDifference = new Date(dateTime) - new Date();
  const timeRelative = getRelativeTimeFormat(timeDifference);
  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit",
    numeric: "auto",
    style: "short"
  });
  const rtfTime = rtf.format(timeRelative.value, timeRelative.unit);
  return timeDifference > 0
    ? `Deal ends ${rtfTime}`
    : "Deal has ended";
};

class CountDown extends Component {
  template () {
    return `
        <div class="timer">
            <div id="countdown">
               00:00:00
            </div>
        </div>
    `;
  }

  controller ({ component }) {
    const interval = setInterval(() => {
      const now = new Date();
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0); // Set end time to 24:00 hours
      const countdown = component.querySelector("#countdown");
      countdown.innerHTML = getRelativeTime(endTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }
}

export class TodayDeals extends Component {
  async data () {
    const auth = AuthService.getCurrentUser();
    const userId = (auth) ? auth.id : "";
    const data = await DataService.searchProduct({
      mastCatId: [],
      catId: [],
      subCatId: [],
      brandId: [],
      dates: [],
      keyword: "",
      filter: "top-deals"
    }, userId);

    return data.data;
  }

  template () {
    const { products } = this.state;

    return (
      <div className="deals-grid deals-today">
        <header className="deals__header">
          <div className="deals__time">
            <div className="deals__title">
              <h3 className="title">Today's Deal</h3>
            </div>
            <button className="deals__text">
              <span id="time"><CountDown/></span>
            </button>
          </div>

          <div className="deals__text">
            <a className="link --see-more" data-route="/products/filter/top-deals">
              <span>See all deals</span>
            </a>
          </div>
        </header>

        <section className="deals__grid">
          <ProductGroup products={products}/>
        </section>
      </div>
    );
  }
}
