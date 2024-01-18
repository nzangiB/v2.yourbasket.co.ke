import clearance from "../../assets/images/clearance-sale.png";

import "./ClearanceSale.scss";

export function ClearanceSale(props) {
    return `
      <div class="clearance">
        <div class="product-title">
          <h1>CLEARANCE SALE | 23 - 26 DECEMBER</h1>
        </div>
          <div class="clearance__container">
              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>

              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>

              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>

              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>
          
              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>
        
              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>
          </div>

          
          <div class="clearance__container">
              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>

              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>

              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>

              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>
          
              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>
        
              <div class="clearance__card">
                <img src="${clearance}" alt="Product Image" class="clearance__image"/>
              </div>
          </div>
      </div>
    `;
  }

