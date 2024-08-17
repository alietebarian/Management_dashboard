import React from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchContext } from "../context/SearchContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { searchInput, setSearchInput } = useSearchContext();

  return (
    <div className="w-full h-20 bg-slate-200 flex justify-around text-center ">
      <div className="relative">
        <input
          type="text"
          placeholder="جست و جو ..."
          className="ml-16 p-2 w-[350px] h-[40px] mt-4 mr-32 rounded-sm focus:outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <span className="absolute top-5 right-[440px] text-3xl ">
          <CiSearch />
        </span>
      </div>
      <div>
        <button className="font-bold border-2 border-indigo-600 px-5 py-2 mt-4 bg-indigo-500 rounded-sm shadow-2xl">
          <Link to={"/newUser"}>اضافه کردن کاربر جدید</Link>
        </button>
      </div>
    </div>
  );
}
