import { capitalize } from "@wearearchangel/handcrafted";
import placeholder from "../../assets/images/placeholder.png";

import "./productVendor.scss";

export function ProductVendor ({ vendor }) {
  const vendorName = vendor.company_name || [vendor.first_name, vendor.middle_name, vendor.last_name].filter(Boolean).join(" ");
  const vendorLogo = vendor?.file_path
    ? `https://api.yourbasket.co.ke/${vendor.file_path}`
    : placeholder;

  return (
    <section className="product-vendor">
      <div className="product-vendor__logo">
        <img src={vendorLogo} alt={vendorLogo}/>
      </div>
      <div className="product-vendor__info">
        <h2 className="title">{capitalize(vendorName)}</h2>
        <p className="text">
          {vendor.website_link & (
            <a className={"btn --link"} href={vendor.website_link} target="_blank"
						   rel="noreferrer">
              {vendor.website_link}
            </a>
          )}
          {!vendor.website_link && (
            <a className={"btn --link"} data-route={`/product/brand/${vendor.id}`}>
							More products from {capitalize(vendorName)}
            </a>
          )}
        </p>
      </div>
    </section>
  );
}
