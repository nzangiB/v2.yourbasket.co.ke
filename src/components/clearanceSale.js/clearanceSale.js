import clearance from "../../assets/images/clearance-sale.png";

import "./clearanceSale.scss";

export function ClearanceSale (props) {
  return `
      <div class="clearanceSale">
        <div class="clearanceSale__header">
          <h1 class="clearanceSale__title">CLEARANCE SALE | 23 - 26 DECEMBER</h1>
        </div>

          <div class="clearanceSale__container">
              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>

              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>

              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>

              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>
          
              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>
        
              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>
          </div>
          
          <div class="clearanceSale__container">
              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>

              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>

              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>

              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>
          
              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>
        
              <div class="clearanceSale__card">
                <img src="${clearance}" alt="Product Image" class="clearanceSale__image"/>
              </div>
          </div>
      </div>
    `;
}
