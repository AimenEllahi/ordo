import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className='bg-white text-black w-screen h-screen flex flex-col justify-center items-center absolute top-0 left-0'>
      <div className='p-4 text-center'>
        <p className='text-sm'>
          Please note that color variations may occur in AR view due to varying
          lighting conditions.
        </p>
      </div>
      <FaSpinner className='mt-2 animate-spin' size={32} />{" "}
     
    </div>
  );
}