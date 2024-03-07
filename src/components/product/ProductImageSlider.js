import { useState } from "../../plugins/react";

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

const ProductImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const slideStylesWithBackground = {
    ...slideStyles,
    backgroundImage: `url("${slides[currentIndex].url}")`
  };

  return (
    <div style={sliderStyles}>
      <div style={slideStylesWithBackground}></div>
      {slides.length > 1 && <div style={dotsContainerStyles}>
        <div onClick={goToPrevious} style={{ ...arrowStyles, marginRight: "50px" }}>
					❰
        </div>
        {slides.map((slide, slideIndex) => (
          <div
            style={{
              ...dotStyle,
              color: currentIndex === slideIndex ? "black" : "gray"
            }}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
						●
          </div>
        ))}
        <div onClick={goToNext} style={{ ...arrowStyles, marginLeft: "50px" }}>
					❱
        </div>
      </div>}
    </div>
  );
};

export default ProductImageSlider;
