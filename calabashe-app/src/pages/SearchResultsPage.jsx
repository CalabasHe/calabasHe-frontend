import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const { searchParam, results } = location.state || { searchParam: '', results: [] };

  return (
    <>
      <Header />
      <div className="bg-white w-full min-h-[400px] border-b-2 pt-[100px] px-4">
        <h1 className="text-2xl font-bold mb-4">Results for "{searchParam}"</h1>
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-semibold">{result.name || `${result.firstName} ${result.lastName}`}</h2>
              <p>{result.specialty || result.type}</p>
              {result.rating && <p>Rating: {result.rating}</p>}
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResultsPage;