import "./ad.scss";

export function Ad ({ src, width, height }) {
  if (!src) {
    try {
      src = require(`./images/${width}x${height}.png`);
    } catch (e) {
      // console.error(e);
      src = `https://via.placeholder.com/${width}x${height}`;
    }
  }

  return (
    <div className="ad" style={{ aspectRatio: `${width}/${height}`, maxWidth: `${width}px` }}>
      <img className="img" src={src} alt="Ad"/>
    </div>
  );
}
