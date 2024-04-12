import { capitalize } from "@wearearchangel/handcrafted";
import placeholder from "../../assets/images/placeholder.png";

import "./productVendor.scss";

export function ProductVendor ({ brand, vendor }) {
  const name = brand?.name || vendor?.company_name || [vendor?.first_name, vendor?.middle_name, vendor?.last_name].filter(Boolean).join(" ");
  const logo = brand?.file_path
    ? `https://api.yourbasket.co.ke/${brand.file_path}`
    : placeholder;

  if (!name) return null;

  return (
    <section className="product-vendor">
      <div className="product-vendor__logo">
        <img src={logo} alt={logo}/>
      </div>
      <div className="product-vendor__info">
        <h2 className="title">{capitalize(name)}</h2>
        <p className="text">
          {brand && (
            <a className={"btn --link"} data-route={`/products/brands/${brand.slug}`}>
							More products from {capitalize(name)}
            </a>
          )}
          {!brand && vendor && (
            <>
              {vendor.website_link
                ? (
                  <a
                    className={"btn --link"}
                    href={vendor.website_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {vendor.website_link}
                  </a>
                )
                : (
                  <a
                    className={"btn --link"}
                    data-route={`/brands/${vendor.id}`}
                  >
										More products from {capitalize(name)}
                  </a>
                )}
            </>
          )}
        </p>
      </div>
    </section>
  );
}
