import * as React from "react";

function RatioIcon(props) {
  return (
    <svg
      width={26}
      height={26}
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M26 20.163a1.345 1.345 0 01-1.345 1.345h-3.138v3.138a1.345 1.345 0 11-2.69 0v-3.138h-13a1.345 1.345 0 01-1.344-1.345v-13H1.345a1.345 1.345 0 110-2.69h3.138V1.335a1.345 1.345 0 012.69 0v17.483h17.482A1.345 1.345 0 0126 20.163zm-15.69-13h8.518v8.517a1.345 1.345 0 002.69 0V5.818a1.345 1.345 0 00-1.346-1.345H10.31a1.345 1.345 0 000 2.69z' />
    </svg>
  );
}

export default RatioIcon;
