import clearance from "../../assets/images/clearance-sale.png";

import "./clearanceSale.scss";
import { Component } from "@wearearchangel/handcrafted";

function ClearanceSaleItem (item) {
  const image = item.file_path
    ? `<img src=${item.file_path} class="" alt="" />`
    : item.name;

  return `
        <div class="clearanceSale__card">
            <div class="clearanceSale__image">
                ${image}
            </div>
        </div>
    `;
}

function ClearanceSaleItems (items) {
  if (!(items && items.length > 0)) return "";
  return items.map(ClearanceSaleItem).join("");
}

export class ClearanceSale extends Component {
  async data () {
    // const { params } = props;
    // const { clearanceSaleItems } = params;
    const clearanceSaleItems = [
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/Steering/TB/_MTBcopy2.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/cp/TBS/HypeDeals/4.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/Steering/TB/_MTB.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/Steering/TB/_MTBcopy.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/cp/TBS/HypeDeals/22.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/cp/TBS/HypeDeals/7loere.jpg"
      }
    ];

    const dealsOnlyAtYourBasket = [
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/Steering/TB/_MTBcopy8.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/Steering/TB/_MTBcopy9.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/Steering/TB/_MTB7.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/cp/TBS/HypeDeals/9.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/cp/TBS/HypeDeals/13.jpg"
      },
      {
        name: "Product Image",
        file_path: "https://ke.jumia.is/cms/2024/W4/cp/TBS/HypeDeals/10.jpg"
      }
    ];

    return {
      clearanceSaleItems,
      dealsOnlyAtYourBasket
    };
  }

  template () {
    const { clearanceSaleItems, dealsOnlyAtYourBasket } = this.state;
    return `
      <div class="clearanceSale">
          <div class="clearanceSale__header">
              <h3 class="title">Clearance Sale | 23 - 26 December</h3>
          </div>

          <div class="clearanceSale__container">
              ${ClearanceSaleItems(clearanceSaleItems)}
          </div>
      </div>
      
      <div class="clearanceSale">
          <div class="clearanceSale__header">
              <h3 class="title">Deals only at YourBasket</h3>
          </div>

          <div class="clearanceSale__container">
              ${ClearanceSaleItems(dealsOnlyAtYourBasket)}
          </div>
      </div>
    `;
  }
}
