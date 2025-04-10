import Star from "../ui/icons/Star";

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between bg-white border-b px-6 py-3'>
      <div
        className='text-black font-bold text-lg'
        style={{ fontFamily: "Helvetica Neue" }}
      >
        LOGO*
      </div>
      <div className='flex items-center gap-2'>
        <button className='bg-black text-white text-xs font-semibold px-3 py-3 rounded-xl'>
          PRO LOGIN
        </button>
        <button className='bg-white border text-black text-xs font-semibold px-3 py-3 rounded-xl flex items-center'>
          UPGRADE{" "}
          <span className='ml-1'>
            <Star />
          </span>
        </button>
      </div>
    </nav>
  );
}
