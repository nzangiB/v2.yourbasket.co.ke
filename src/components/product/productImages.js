// import { useState } from "react";
import placeholder from "../../assets/images/placeholder.png";

import "./productImages.scss";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
};

const arrowStyles = {
  fontSize: "18px",
  color: "#000000",
  cursor: "pointer"
};

const sliderStyles = {
  position: "relative",
  height: "100%"
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "15px"
};

function ProductImageSlider ({ currentImage, slides }) {
  if (!slides.length) {
    return (
      <div className="product-images__slider">
        <img src={currentImage} alt="product image" className={"img"}/>
      </div>
    );
  }

  const currentIndex = 0;
  // const [currentIndex, setCurrentIndex] = useState(0);
  //
  // const goToPrevious = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };
  //
  // const goToNext = () => {
  //   const isLastSlide = currentIndex === slides.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // };
  //
  // const goToSlide = (slideIndex) => {
  //   setCurrentIndex(slideIndex);
  // };

  const slideStylesWithBackground = {
    ...slideStyles,
    backgroundImage: `url("${slides[currentIndex].url}")`
  };

  return (
    <div className="product-images__slider">
      <div style={sliderStyles}>
        <div style={slideStylesWithBackground}></div>
        {/* {slides.length > 1 && <div style={dotsContainerStyles}> */}
        {/*  <button onClick={goToPrevious} style={{ ...arrowStyles, marginRight: "50px" }}> */}
        {/*    <span>❰</span> */}
        {/*  </button> */}
        {/*  {slides.map((slide, slideIndex) => ( */}
        {/*    <div */}
        {/*      style={{ */}
        {/*        ...dotStyle, */}
        {/*        color: currentIndex === slideIndex ? "black" : "gray" */}
        {/*      }} */}
        {/*      key={slideIndex} */}
        {/*      onClick={() => goToSlide(slideIndex)} */}
        {/*    > */}
        {/*      <span>●</span> */}
        {/*    </div> */}
        {/*  ))} */}
        {/*  <button onClick={goToNext} style={{ ...arrowStyles, marginLeft: "50px" }}> */}
        {/*    <span>❱</span> */}
        {/*  </button> */}
        {/* </div>} */}
      </div>
    </div>
  );
}

function ProductImageThumbnails ({ images, setCurrentImage }) {
  return (
    <section className="product-image__thumbnails">
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

export function ProductImages ({ product }) {
  // const [currentImage, setCurrentImage] = useState(product.file_path
  //   ? `https://api.yourbasket.co.ke/${product.file_path}`
  //   : placeholder);
  const currentImage = product.file_path
    ? `https://api.yourbasket.co.ke/${product.file_path}`
    : placeholder;

  const slides = product?.images?.map(image => {
    image = image ?? placeholder;
    const url = image?.file_path
      ? `https://api.yourbasket.co.ke/${image.file_path}`
      : image;
    const title = "product image";
    return ({ url, title });
  });

  return (
    <section className="product-images">
      <ProductImageSlider currentImage={currentImage} slides={slides}/>
      {/* <ProductImageThumbnails images={product.images} setCurrentImage={setCurrentImage}/> */}
    </section>
  );
}
