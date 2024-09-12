
// 
const SearchButtonSm = ({ onSearchClick }) => {
  return (
    <div
      onClick={onSearchClick}
      className="w-full flex justify-between bg-white md:hidden h-12 text-white text-xs md:text-base lg:text-lg font-semibold p-1 rounded-3xl"
    >
      <input className=" placeholder:font-normal rounded-[inherit]  w-[80%] h-full p-2 border-none" type="text" placeholder="Search for doctors and facilities"></input>
      <div className="bg-[#007AFF] h-full flex items-center justify-center w-[60px]  rounded-3xl ">
      <svg
              // tabIndex="0"
              aria-label="Search Button"
              className="w-[18px] h-[18px]"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
      </div>
    </div>
  );
};

export default SearchButtonSm;