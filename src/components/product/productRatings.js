import DataService from "../../services/data.service";

import "./productRatings.scss";

export async function ProductRatings ({ product }) {
  const dw = await DataService.getProductReviews(product.id, "asc");
  const reviews = dw.data.reviews;
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

  console.log(ratings);
  return (
    <div className="product-ratings">
      <div className="ratings">
        <div className="rating">{ratings}</div>
      </div>
    </div>
  );
}
