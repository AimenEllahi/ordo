import React from "react";
const UploadIcon = (props) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M23.895 4.553l-2-4A1 1 0 0021 0H3a1 1 0 00-.895.552l-2 4A1.01 1.01 0 000 5v17a2 2 0 002 2h20a2 2 0 002-2V5a1.01 1.01 0 00-.105-.447zm-7.188 9.154a1.001 1.001 0 01-1.415 0L13 11.415V19a1 1 0 01-2 0v-7.586l-2.293 2.293a1.001 1.001 0 01-1.415-1.415l4-4a1 1 0 011.415 0l4 4a1.001 1.001 0 010 1.415zM2.617 4l1-2h16.765l1 2H2.617z' />
    </svg>
  );
};

export default UploadIcon;
