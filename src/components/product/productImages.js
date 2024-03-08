import { useState } from "../../plugins/react";

import ProductImageSlider from "./ProductImageSlider";

import "./productImages.scss";
import placeholder from "../../assets/images/placeholder.png";

export function ProductImages ({ product }) {
  const [currentImage, setCurrentImage] = useState(product.file_path
    ? `https://api.yourbasket.co.ke/${product.file_path}`
    : placeholder);

  const slides = product?.images?.map(image => {
    image = image ?? placeholder;
    const url = image?.file_path
      ? `https://api.yourbasket.co.ke/${image.file_path}`
      : image;
    const title = "product image";
    return ({ url, title });
  });
  const containerStyles = {
    width: "100%",
    aspectRatio: "4/3",
    margin: "0 auto"
  };

  function ImageThumbnails (images) {
    return (
      <section className="image-thumbnails">
        <ul>
          {images.length && images.map(image => (
            <li>
              <button onClick={() => setCurrentImage(image)}>
                <img src={image} alt="product thumbnail"/>
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="product-images">
      <div style={containerStyles}>
        {slides.length
          ? <ProductImageSlider slides={slides}/>
          : <img src={currentImage} alt="product image" className={"img"}/>
        }
      </div>
      <ImageThumbnails images={product.images}/>
    </section>
  );
}
