import { useLocation, Link } from "react-router-dom";
import ExploreCategories from "../components/Categories";
import StarRating from "../components/rating";
import { useState } from "react";
import formatDate from "../utils/dateConversion";

const SearchResultsPageLG = () => {
  const location = useLocation();
  const { searchParam, results } = location.state || {
    searchParam: "",
    results: [],
  };
  // State to manage the visibility of the filter overlay
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    <main className="  pb-11">
      <section className="bg-white w-full h-auto border-b-2 pt-[100px] pb-10">
        <h1 className="font-poppins pt-9 font-bold  text-5xl md:text-4xl flex justify-center items-center">
          Results for &quot;{searchParam}&quot;
        </h1>
        <ExploreCategories />
        {/*Filter for mobile*/}
        {/* Filter Button */}
        <div className=" md:hidden lg:hidden flex justify-center mt-2 px-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="border border-[#205CD4] text-[#205CD4] flex justify-center space-x-3 py-2 w-full rounded-full"
          >
            <div className="font-semibold text-lg">Filter</div>

            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 2C8.06902 1.99951 7.16081 2.28778 6.40053 2.82508C5.64025 3.36239 5.06533 4.12227 4.755 5H0V8H4.755C5.0649 8.8783 5.63961 9.63885 6.3999 10.1768C7.16019 10.7148 8.06863 11.0037 9 11.0037C9.93137 11.0037 10.8398 10.7148 11.6001 10.1768C12.3604 9.63885 12.9351 8.8783 13.245 8H24V5H13.245C12.9347 4.12227 12.3598 3.36239 11.5995 2.82508C10.8392 2.28778 9.93098 1.99951 9 2ZM7.5 6.5C7.5 6.10218 7.65804 5.72064 7.93934 5.43934C8.22064 5.15804 8.60218 5 9 5C9.39782 5 9.77936 5.15804 10.0607 5.43934C10.342 5.72064 10.5 6.10218 10.5 6.5C10.5 6.89783 10.342 7.27936 10.0607 7.56066C9.77936 7.84196 9.39782 8 9 8C8.60218 8 8.22064 7.84196 7.93934 7.56066C7.65804 7.27936 7.5 6.89783 7.5 6.5ZM15 14C14.069 13.9995 13.1608 14.2878 12.4005 14.8251C11.6402 15.3624 11.0653 16.1223 10.755 17H0V20H10.755C11.0649 20.8783 11.6396 21.6388 12.3999 22.1768C13.1602 22.7148 14.0686 23.0037 15 23.0037C15.9314 23.0037 16.8398 22.7148 17.6001 22.1768C18.3604 21.6388 18.9351 20.8783 19.245 20H24V17H19.245C18.9347 16.1223 18.3598 15.3624 17.5995 14.8251C16.8392 14.2878 15.931 13.9995 15 14ZM13.5 18.5C13.5 18.1022 13.658 17.7206 13.9393 17.4393C14.2206 17.158 14.6022 17 15 17C15.3978 17 15.7794 17.158 16.0607 17.4393C16.342 17.7206 16.5 18.1022 16.5 18.5C16.5 18.8978 16.342 19.2794 16.0607 19.5607C15.7794 19.842 15.3978 20 15 20C14.6022 20 14.2206 19.842 13.9393 19.5607C13.658 19.2794 13.5 18.8978 13.5 18.5Z"
                fill="#205CD4"
              />
            </svg>
          </button>
        </div>
      </section>
      {/* Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 relative w-11/12 max-w-md">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 8.586L16.95 1.636 18.364 3.05 11.414 10 18.364 16.95l-1.414 1.414L10 11.414l-6.95 6.95-1.414-1.414L8.586 10 1.636 3.05 3.05 1.636 10 8.586z"
                  fill="#000"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold mb-4">Filter Options</h2>

            {/* Rating Filter Options */}
            <div>
              <p className="font-semibold">Select Rating:</p>
              <div className="flex  justify-center mt-4">
                <button
                  className={`border-[#000000] min-w-fit px-4 py-2 text-[#205CD4] font-semibold rounded-tl-lg rounded-bl-lg ${
                    selectedRating === "Any"
                      ? "bg-[#d7e3fa] border-[#000000] border-t-2 border-l-2 border-b-2"
                      : "border-t-2 border-l-2 border-b-2"
                  }`}
                  onClick={() => setSelectedRating("Any")}
                >
                  Any
                </button>
                <button
                  className={`border-[#000000] font-semibold min-w-fit text-[#205CD4] px-4 py-2 ${
                    selectedRating === "3.0"
                      ? "bg-[#d7e3fa] border-t-2 border-b-2 border-l-2"
                      : "border-t-2 border-b-2 border-l-2"
                  }`}
                  onClick={() => setSelectedRating("3.0")}
                >
                  3.0 ★
                </button>
                <button
                  className={`border-[#000000] min-w-fit px-4 py-2 font-semibold text-[#205CD4] ${
                    selectedRating === "4.0"
                      ? "bg-[#d7e3fa] border-t-2 border-b-2 border-l-2"
                      : "border-t-2 border-b-2 border-l-2"
                  }`}
                  onClick={() => setSelectedRating("4.0")}
                >
                  4.0 ★
                </button>
                <button
                  className={`border-[#000000] min-w-fit font-semibold text-[#205CD4] px-4 py-2 rounded-tr-lg rounded-br-lg ${
                    selectedRating === "4.5"
                      ? "bg-[#d7e3fa] border-t-2 border-r-2 border-b-2 border-l-2 rounded-tr-lg rounded-br-lg"
                      : "border-t-2 border-r-2 border-b-2 border-l-2"
                  }`}
                  onClick={() => setSelectedRating("4.5")}
                >
                  4.5 ★
                </button>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  setIsFilterOpen(false); // Close the overlay
                  // Additional logic can be added here to apply filters
                }}
                className="bg-[#205CD4] w-full text-white py-2 px-4 rounded-full"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" w-full mt-[100px] px-4 flex justify-center">
        <section className="flex flex-col lg:flex-row gap-11 lg:justify-center w-full">
          {/* First column for the rating card */}
          <div className="min-w-fit hidden md:block lg:block ">
            {/* Rating card */}
            <div className="   h-auto bg-[#fff] rounded-[8px] border-solid border p-5 border-[#d9d9d9]">
              <p className="font-semibold">Rating</p>
              <div className="flex mt-4 ">
                <button
                  className={`border-[#000000] min-w-fit px-4 py-2 text-[#205CD4] font-semibold rounded-tl-lg rounded-bl-lg  ${
                    selectedRating === "Any"
                      ? "bg-[#d7e3fa] border-[#000000] border-t-2 border-l-2 border-b-2"
                      : "border-t-2 border-l-2 border-b-2 rounded-tl-lg rounded-bl-lg"
                  }`}
                  onClick={() => setSelectedRating("Any")}
                >
                  Any
                </button>
                <button
                  className={`border-[#000000] font-semibold min-w-fit text-black px-4 py-2 ${
                    selectedRating === "3.0"
                      ? "bg-[#d7e3fa] border-t-2 border-b-2 border-l-2"
                      : "border-t-2 border-b-2 border-l-2"
                  }`}
                  onClick={() => setSelectedRating("3.0")}
                >
                  3.0 ★
                </button>
                <button
                  className={`border-[#000000] min-w-fit px-4 py-2 font-semibold text-black  ${
                    selectedRating === "4.0"
                      ? "bg-[#d7e3fa] border-t-2 border-b-2 border-l-2 "
                      : "border-t-2 border-b-2 border-l-2"
                  }`}
                  onClick={() => setSelectedRating("4.0")}
                >
                  4.0 ★
                </button>
                <button
                  className={`border-[#000000] min-w-fit font-semibold text-black px-4 py-2 rounded-tr-lg rounded-br-lg ${
                    selectedRating === "4.5"
                      ? "bg-[#d7e3fa] border-t-2 border-r-2 border-b-2 border-l-2  rounded-tr-lg rounded-br-lg"
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
          <div className=" w-full max-w-[900px]">
            {/* Displaying total count of results as Companies */}
            <div className="mb-4 2">
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
            <div className="justify-items-start flex flex-col items-start gap-4 lg:gap-12">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="w-full space-y-3 max-w-[700px] rounded-lg border border-[#d9d9d9] bg-white"
                  >
                    <div className="w-full h-auto bg-white rounded-[8px] p-4 flex flex-col lg:flex-row gap-4 items-start">
                      {/* Image placeholder for doctor/facility */}
                      <div className="w-[89px] h-[94px] bg-[#d9d9d9] rounded-[8px]" />

                      {/* Name and link */}
                      <div className="flex-1">
                        {result.specialty ? (
                          <Link to={`/doctors/${result.slug}`}>
                            <h2 className="font-poppins text-lg  md:text-base lg:text-lg text-[16px] font-semibold leading-[24px]">
                              Dr. {result.firstName} {result.lastName}
                            </h2>
                          </Link>
                        ) : result.type ? (
                          <Link
                            to={`/facilities/${result.type}s/${result.slug}`}
                          >
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
                      <div className="">
                        <button
                          onClick={() => toggleAccordion(result.id)}
                          className="text-[#205cd4] text-lg focus:outline-none"
                        >
                          {openAccordion === result.id
                            ? "Hide reviews"
                            : "Latest reviews"}
                        </button>
                      </div>
                    </div>
                    <div className="mt-11">
                      <hr className="w-auto " />
                      <div className="flex items-center mt-1 mb-1 ml-2 cursor-pointer">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 28.875C24.0061 28.875 28.875 24.0061 28.875 18C28.875 11.9939 24.0061 7.125 18 7.125C11.9939 7.125 7.125 11.9939 7.125 18C7.125 24.0061 11.9939 28.875 18 28.875Z"
                            stroke="#18191A"
                            strokeWidth="0.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.125 18H28.875M8.60775 12.5198H27.3922M8.6085 23.4802H27.3915M18 28.875V7.125"
                            stroke="#18191A"
                            strokeWidth="0.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 28.875C21.0267 28.875 23.4803 24.0061 23.4803 18C23.4803 11.9939 21.0267 7.125 18 7.125C14.9734 7.125 12.5198 11.9939 12.5198 18C12.5198 24.0061 14.9734 28.875 18 28.875Z"
                            stroke="#18191A"
                            strokeWidth="0.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg
                          className=""
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 1.92859C14.2164 1.92859 16.3421 2.80907 17.9094 4.37634C19.4766 5.94361 20.3571 8.06928 20.3571 10.2857C20.3571 13.8172 17.8757 17.6657 12.9771 21.8726C12.7047 22.1066 12.3574 22.2351 11.9984 22.2348C11.6393 22.2345 11.2922 22.1053 11.0203 21.8709L10.6963 21.5897C6.01454 17.4926 3.64282 13.7383 3.64282 10.2857C3.64282 8.06928 4.5233 5.94361 6.09057 4.37634C7.65784 2.80907 9.78351 1.92859 12 1.92859ZM12 3.2143C10.1245 3.2143 8.32586 3.95933 6.99971 5.28548C5.67356 6.61163 4.92854 8.41027 4.92854 10.2857C4.92854 13.2874 7.11254 16.746 11.5405 20.6203L11.8603 20.8972C11.8991 20.9306 11.9487 20.949 12 20.949C12.0512 20.949 12.1008 20.9306 12.1397 20.8972C16.782 16.9097 19.0714 13.3586 19.0714 10.2857C19.0714 9.3571 18.8885 8.43756 18.5331 7.57961C18.1777 6.72167 17.6569 5.94212 17.0002 5.28548C16.3436 4.62883 15.564 4.10796 14.7061 3.75258C13.8481 3.39721 12.9286 3.2143 12 3.2143ZM12 7.07145C12.8524 7.07145 13.67 7.41009 14.2728 8.01289C14.8756 8.61568 15.2143 9.43325 15.2143 10.2857C15.2143 11.1382 14.8756 11.9558 14.2728 12.5586C13.67 13.1614 12.8524 13.5 12 13.5C11.1475 13.5 10.3299 13.1614 9.72712 12.5586C9.12433 11.9558 8.78568 11.1382 8.78568 10.2857C8.78568 9.43325 9.12433 8.61568 9.72712 8.01289C10.3299 7.41009 11.1475 7.07145 12 7.07145ZM12 8.35716C11.4885 8.35716 10.9979 8.56035 10.6363 8.92203C10.2746 9.2837 10.0714 9.77424 10.0714 10.2857C10.0714 10.7972 10.2746 11.2878 10.6363 11.6494C10.9979 12.0111 11.4885 12.2143 12 12.2143C12.5115 12.2143 13.002 12.0111 13.3637 11.6494C13.7253 11.2878 13.9285 10.7972 13.9285 10.2857C13.9285 9.77424 13.7253 9.2837 13.3637 8.92203C13.002 8.56035 12.5115 8.35716 12 8.35716Z"
                            fill="#18191A"
                          />
                        </svg>
                        <div className="flex pl-2">
                          <svg
                            width="2"
                            height="28"
                            viewBox="0 0 2 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1 0V27.5" stroke="#D9D9D9" />
                          </svg>
                          <p></p>
                        </div>
                      </div>
                    </div>
                    {/* Accordion Details inside the card */}
                    {openAccordion === result.id && (
                      <div className=" overflow-x-scroll w-full px-4 ">
                        <div className="flex gap-4 pb-4">
                          {result.reviews && result.reviews.length > 0 ? (
                            result.reviews.map((review, index) => (
                              <div
                                key={index}
                                className="min-w-[200px] max-w-[300px] border rounded-lg border-[#D9D9D9]   p-4"
                              >
                                <p className="text-sm text-gray-500 ">
                                  {formatDate(review.created_at.split("T")[0])}
                                </p>
                                <p className="text-md text-[#1c1c1c] font-medium mt-4">
                                  {review.description}
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
            <div></div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SearchResultsPageLG;
