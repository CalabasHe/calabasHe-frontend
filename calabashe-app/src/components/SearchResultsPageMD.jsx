import { useLocation, Link } from "react-router-dom";
import ExploreCategories from "../components/Categories";
import StarRating from "../components/rating";
import { useState } from "react";

const SearchResultsPageLG = () => {
  const location = useLocation();
  const { searchParam, results } = location.state || {
    searchParam: "",
    results: [],
  };

  // State to manage the open accordion item
  const [openAccordion, setOpenAccordion] = useState(null);

  // State to manage selected rating filter
  const [selectedRating, setSelectedRating] = useState("Any");

  // Function to toggle the accordion
  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Filter results based on selected rating
  const filteredResults = results.filter((result) => {
    if (selectedRating === "Any") {
      return true;
    }
    return (
      result.rating && parseFloat(result.rating) >= parseFloat(selectedRating)
    );
  });

  return (
    <main className="hidden lg:block md:block">
      <section className="bg-white w-full h-auto border-b-2 pt-[100px] pb-10">
        <h1 className="font-poppins pt-9 font-bold text-4xl flex justify-center items-center">
          Results for "{searchParam}"
        </h1>
        <ExploreCategories />
      </section>

      <section className="flex flex-col lg:flex-row gap-6 mt-[100px] px-6">
        {/* First column for the rating card */}
        <div className="lg:w-1/4 w-full max-w-[350px]">
          {/* Rating card */}
          <div className="w-full h-auto bg-[#fff] rounded-[8px] border-solid border p-5 border-[#d9d9d9] p-4">
            <p className="font-semibold">Rating</p>
            <div className="flex mt-4">
              <button
                className={`border-[#000000] px-4 py-2 text-[#205CD4] font-semibold rounded-tl-lg rounded-bl-lg  ${
                  selectedRating === "Any"
                    ? "bg-[#d7e3fa] border-[#000000] "
                    : "border-t-2 border-l-2 border-b-2 rounded-tl-lg rounded-bl-lg"
                }`}
                onClick={() => setSelectedRating("Any")}
              >
                Any
              </button>
              <button
                className={`border-[#000000] font-semibold text-[#205CD4] px-4 py-2 ${
                  selectedRating === "3.0"
                    ? "bg-[#d7e3fa] "
                    : "border-t-2 border-b-2 border-l-2"
                }`}
                onClick={() => setSelectedRating("3.0")}
              >
                3.0 ★
              </button>
              <button
                className={`border-[#000000] px-4 py-2 font-semibold text-[#205CD4]  ${
                  selectedRating === "4.0"
                    ? "bg-[#d7e3fa] "
                    : "border-t-2 border-b-2 border-l-2"
                }`}
                onClick={() => setSelectedRating("4.0")}
              >
                4.0 ★
              </button>
              <button
                className={`border-[#000000] font-semibold text-[#205CD4] px-4 py-2 rounded-tr-lg rounded-br-lg ${
                  selectedRating === "4.5"
                    ? "bg-[#d7e3fa]  rounded-tr-lg rounded-br-lg"
                    : "border-t-2 border-r-2 border-b-2 border-l-2"
                }`}
                onClick={() => setSelectedRating("4.5")}
              >
                4.5 ★
              </button>
            </div>
          </div>
        </div>

        {/* Second column with the count label and results */}
        <div className="lg:w-3/4 w-full max-w-[900px]">
          {/* Displaying total count of results as Companies */}
          <div className="mb-4">
            {filteredResults.length > 0 ? (
              <h2 className="text-lg font-semibold">
                Companies{" "}
                <span className="font-normal text-[#6a6a67]">
                  ({filteredResults.length})
                </span>
              </h2>
            ) : (
              <h2 className="text-lg font-semibold">No companies found</h2>
            )}
          </div>

          {/* Results list */}
          <div className="grid gap-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <div
                  key={result.id}
                  className="w-full max-w-[800px] h-auto bg-white rounded-[8px] border border-[#d9d9d9] p-4 flex flex-col lg:flex-row gap-4 items-start mx-auto"
                >
                  {/* Image placeholder for doctor/facility */}
                  <div className="w-[89px] h-[94px] bg-[#d9d9d9] rounded-[8px]" />

                  {/* Name and link */}
                  <div className="flex-1">
                    {result.specialty ? (
                      <Link to={`/doctors/${result.slug}`}>
                        <h2 className="font-poppins text-[16px] font-semibold leading-[24px]">
                          Dr. {result.firstName} {result.lastName}
                        </h2>
                      </Link>
                    ) : result.type ? (
                      <Link to={`/facilities/${result.type}s/${result.slug}`}>
                        <h2 className="font-poppins text-[16px] font-semibold leading-[24px]">
                          {result.name}
                        </h2>
                      </Link>
                    ) : (
                      <h2 className="font-poppins text-[16px] font-semibold leading-[24px]">
                        {result.name}
                      </h2>
                    )}

                    {/* Rating */}
                    <div className="flex gap-[4px] mt-2">
                      <StarRating rating={result.rating} />
                    </div>

                    {/* Reviews count */}
                    <span className="text-[#6a6a67] text-[16px]">
                      {result.reviewCount || "No"} reviews
                    </span>
                  </div>

                  {/* Latest Reviews Link */}
                  <div className="ml-auto mt-4 lg:mt-0">
                    <button
                      onClick={() => toggleAccordion(result.id)}
                      className="text-[#205cd4] text-[14px] focus:outline-none"
                    >
                      {openAccordion === result.id
                        ? "Hide reviews"
                        : "Latest reviews"}
                    </button>
                  </div>

                  {/* Accordion Details inside the card */}
                  {openAccordion === result.id && (
                    <div className="w-full mt-4">
                      <div className="flex overflow-x-auto gap-4 pb-4">
                        {result.reviews && result.reviews.length > 0 ? (
                          result.reviews.map((review, index) => (
                            <div
                              key={index}
                              className="min-w-[200px] max-w-[300px] bg-[#f9f9f9] border border-[#d9d9d9] rounded-[8px] p-4"
                            >
                              <p className="text-sm text-gray-700">
                                {review.content}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {review.reviewerName} - {review.date}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm">No reviews available.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchResultsPageLG;
