import { Component } from "@wearearchangel/handcrafted";

import DataService from "../../services/data.service";

export class ProductReviews extends Component {
  data () {
    const { product } = this.props;
    return DataService.getProductReviews(product.id, "asc").then(dw => dw.data);
  }

  template () {
    const { reviews, reviewsCount } = this.state;
    return (
      <section className="product-reviews">
        <h2 className="title">{reviewsCount.length} Reviews</h2>
        {reviewsCount?.length
          ? (
            <ul>
              {reviews.map(review => <li>{review}</li>)}
            </ul>
          )
          : (
            <p>No reviews yet</p>
          )}
      </section>
    );
  }
}
