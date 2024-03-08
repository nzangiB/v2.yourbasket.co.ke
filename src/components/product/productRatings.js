import DataService from "../../services/data.service";

import "./productRatings.scss";

export async function ProductRatings ({ productId }) {
  const dw = await DataService.getProductReviews(productId, "asc");
  const reviewsCount = dw.data.reviewsCount;

  let totalRating = 0;
  const ratings = [];
  if (reviewsCount?.length) {
    reviewsCount.map((value) => {
      totalRating += value.total_rating;
    });
    const ratingValue = totalRating / reviewsCount?.length;
    for (let i = 0; i < 5; i++) {
      ratings.push(ratingValue - i);
    }
  }

  return (
    <div className="product-ratings">
      <div className="ratings">
        <div className="rating">
          <span className="srt">4.19 out of 5 stars based on  reviews</span>
          {ratings.length
            ? (
              <span className="rating__stars rating__stars--filled">
                {ratings.map((value, index) => (
	                <svg key={index} aria-hidden="true" className="icon is-medium">
		                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"/>
	                </svg>
                ))}
              </span>
            )
            : "No ratings"}
        </div>
      </div>
    </div>
  );
}
