// import { useState } from "react";

import "./productSpecs.scss";

export function ProductSpecs ({ size, color, variant }) {
  // const [size, setSize] = useState(props.size);
  // const [color, setColor] = useState(props.colors[0]);
  //
  // const SizePicker = props => () => (
  //   <section className="size-picker">
  //     <ul>
  //       {props.sizes.map(size => (
  //         <li>
  //           <button onClick={() => setSize(size)}>
  //             <span>{size}</span>
  //           </button>
  //         </li>
  //       ))}
  //     </ul>
  //   </section>
  // );
  //
  // const ColorPicker = props => () => (
  //   <section className="color-picker">
  //     <ul>
  //       {props.colors.map(color => (
  //         <li>
  //           <button onClick={() => setColor(color)} style={{ backgroundColor: color, borderRadius: "50%" }}>
  //             <span className="srt">{color}</span>
  //           </button>
  //         </li>
  //       ))}
  //     </ul>
  //   </section>
  // );

  if (!variant.length) return null;

  return (
    <section className="product-specs">
      {/* <ul> */}
      {/*  <ColorPicker colors={props.colors}/> */}
      {/*  <SizePicker sizes={props.sizes}/> */}
      {/* </ul> */}
    </section>
  );
}
