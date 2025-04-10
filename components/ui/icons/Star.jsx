import * as React from "react"

function Star(props) {
  return (
    <svg
      width={15}
      height={16}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.115.368c.11-.389.66-.389.77 0L9.34 5.54a.4.4 0 00.235.263l4.51 1.827a.4.4 0 010 .742l-4.51 1.827a.4.4 0 00-.235.263l-1.455 5.17c-.11.39-.66.39-.77 0l-1.455-5.17a.4.4 0 00-.235-.263L.915 8.371a.4.4 0 010-.742l4.51-1.827a.4.4 0 00.235-.263L7.115.37z"
        fill="#000"
      />
    </svg>
  )
}

export default Star