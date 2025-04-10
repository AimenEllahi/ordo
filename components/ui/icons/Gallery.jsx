import * as React from "react";

function Gallery({ color = "gray", ...props }) {
  return (
    <svg
      width={21}
      height={18}
      viewBox="0 0 21 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.625 5.625a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm8.625-3.75v13.5a1.875 1.875 0 01-1.875 1.875h-16.5A1.875 1.875 0 010 15.375v-13.5A1.875 1.875 0 011.875 0h16.5a1.875 1.875 0 011.875 1.875zm-18 .375v7.474l3.174-3.175a1.875 1.875 0 012.652 0l3.86 3.857 1.61-1.61a1.875 1.875 0 012.651 0L18 10.603V2.25H2.25zm0 12.75h11.094L6.75 8.406l-4.5 4.5V15zM18 15v-1.219l-3.128-3.128L13.526 12l3 3H18z"
        fill={color}
      />
    </svg>
  );
}

export default Gallery;
