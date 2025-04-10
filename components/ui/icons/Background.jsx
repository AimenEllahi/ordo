import * as React from "react";
function BackgroundIcon(props) {
  return (
    <svg
      width={26}
      height={22}
      viewBox='0 0 26 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M24-.01H2a2 2 0 00-2 2v18a2 2 0 002 2h22a2 2 0 002-2v-18a2 2 0 00-2-2zm-7.5 6a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm7.5 14H2v-4.913l5.793-5.794a1 1 0 011.414 0l8.418 8.415a1 1 0 101.415-1.415l-2.207-2.206 1.792-1.794a1 1 0 011.414 0L24 16.25v3.742z' />
    </svg>
  );
}

export default BackgroundIcon;
