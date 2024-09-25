import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchResultsPage = () => {
  const location = useLocation();
  const { searchParam } = location.state;

  return (
    <>
      <Header />
      <div className="bg-white w-full h-[400px] border-b-2 pt-[100px]">
        <h1>Results for "{searchParam}"</h1>
      </div>
    </>
  );
};

export default SearchResultsPage;
