import { OfferBanner } from "../carousel/carousel";

export function DealCarousel (props) {
  const { banners } = props;

  return `
      <div class="deals-carousel">
          <div class="carousel">
              ${new OfferBanner(banners[4]).render()}
              ${new OfferBanner(banners[6]).render()}
          </div>
      </div>
  `;
}
