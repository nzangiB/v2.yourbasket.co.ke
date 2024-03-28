import "./ad.scss";

export function Ad ({ src, width, height, redirectTo }) {
  if (!src) {
    try {
      src = require(`./images/${width}x${height}.png`);
    } catch (e) {
      // console.error(e);
      src = `https://via.placeholder.com/${width}x${height}`;
    }
  }

  const ad = (
    <div className="ad" style={{ aspectRatio: `${width}/${height}`, maxWidth: `${width}px` }}>
      <img className="img" src={src} alt="Ad"/>
    </div>
  );

  if (redirectTo) {
    return <a href={redirectTo} target="_blank" rel="noreferrer">{ad}</a>;
  } else {
    return ad;
  }
}
