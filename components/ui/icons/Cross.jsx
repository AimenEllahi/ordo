import * as React from "react"
function Cross(props) {
  return (
    <svg
      width={29}
      height={29}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28.389 25.46a2.074 2.074 0 11-2.933 2.932L14.5 17.434 3.541 28.39a2.075 2.075 0 01-2.933-2.933L11.567 14.5.61 3.543A2.074 2.074 0 113.544.609L14.5 11.568 25.459.608a2.074 2.074 0 012.933 2.933L17.433 14.5 28.39 25.459z"
        fill="#000"
      />
    </svg>
  )
}

export default Cross
