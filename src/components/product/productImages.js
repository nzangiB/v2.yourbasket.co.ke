import { useState } from "../../plugins/react";

import ProductImageSlider from "./ProductImageSlider";

import "./productImages.scss";

export function ProductImages ({ product }) {
  const [currentImage, setCurrentImage] = useState(product?.images?.[0]);

  const slides = product?.images?.map(image => ({
    url: image,
    title: "product image"
  }));
  const containerStyles = {
    width: "100%",
    aspectRatio: "4/3",
    margin: "0 auto"
  };

  // function ImageThumbnails (product) {
  //   return (
  //     <section className="image-thumbnails">
  //       <ul>
  //         {product?.images.map(image => (
  //           <li>
  //             <button onClick={() => setCurrentImage(image)}>
  //               <img src={image} alt="product thumbnail"/>
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     </section>
  //   );
  // }

  return (
    <section className="product-images">
      {/* <img src={currentImage} alt="product image"/> */}
      <div style={containerStyles}>
        {slides.length
          ? <ProductImageSlider slides={slides}/>
          : "Image"
        }
      </div>
      {/* <ImageThumbnails images={product.images}/> */}
    </section>
  );
}
