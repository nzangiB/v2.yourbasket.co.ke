import DataService from "../../services/data.service";

export async function ProductReviews ({ product }) {
  const { reviews, reviewsCount } = await DataService.getProductReviews(product.id, "asc").then(dw => dw.data);
  return reviewsCount.length && (
    <section className="product-reviews">
      <h2 className="title">{reviewsCount.length} Reviews</h2>
      <ul>
        {reviews.map(review => <li>{review}</li>)}
      </ul>
    </section>
  );
}
