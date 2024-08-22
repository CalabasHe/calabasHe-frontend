import { useState } from "react";

const SearchButton = () => {
  const [searchParams, setSearchParams] = useState('');

  const handleSearch = (e) => {
    e.preventDefault()

    

  }

  return (
    <form role="search" onSubmit={handleSearch}>
      <div  className="cursor-auto  bg-white relative max-w-[455px] lg:max-w-[100%] rounded-3xl lg:rounded-[999999px] font-medium border-[1px] border-black ">
        <input
          value={searchParams}
          type="search"
          spellCheck='false'
          className="h-10  md:h-[50px] lg:h-[70px] w-[71%] border-none rounded-[inherit] text-base placeholder:text-[#5E5E5E] placeholder:text-xs md:placeholder:text-base caret-[#34c759] outline-none px-4 lg:pl-6"
          placeholder="Doctors, Clinics or Services"
          onChange={(e => setSearchParams(e.target.value))}
        />
        <button className=" absolute w-[30%] h-8 md:h-[40px] lg:h-[60px] right-1 top-1 md:top-[5px] text-white text-xs md:text-base lg:text-lg font-semibold p-2 lg:p-1 bg-[#204CD4]  rounded-[inherit]">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchButton;
