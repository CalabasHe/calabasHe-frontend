import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const Conditions = () => {
  const sectionRefs = useRef({});
  const [conditionsByLetter, setConditionsByLetter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.calabashe.com/api/conditions/all/');
        
        // Group conditions by first letter
        const groupedConditions = {};
        
        // Initialize with all letters of the alphabet
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(letter => {
          groupedConditions[letter] = [];
        });
        
        // Group conditions by their first letter
        response.data.forEach(condition => {
          const firstLetter = condition.name.charAt(0).toUpperCase();
          if (groupedConditions[firstLetter]) {
            groupedConditions[firstLetter].push({
              name: condition.name,
              slug: condition.slug
            });
          }
        });
        
        setConditionsByLetter(groupedConditions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching conditions:', err);
        setError('Failed to load conditions. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchConditions();
  }, []);

  const handleScroll = (letter) => {
    const lowerCaseLetter = letter.toLowerCase();
    const element = sectionRefs.current[lowerCaseLetter];
    if (!element) {
      console.log(`[SCROLL DEBUG] Element not found for letter: ${letter}`);
      return;
    }

    // Calculate the exact position to scroll to
    const headerOffset = 120; // Adjust this value based on your header's height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // Use a small delay to ensure the DOM is ready
    setTimeout(() => {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }, 10);
  };

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");



  return (
    <div className="2xl:container mx-auto 2xl:border-x">
      <Header />
      <div className="">
        <div className="z-0 absolute top-[60px] sm:top-[70px] w-[25%] bg-[#04DA8D] h-16 max-w-[110px] sm:max-w-[180px] sm:h-24"></div>
        <div className="z-0 absolute top-[120px] sm:top-[162px] h-3 w-[27%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
        <aside className="mt-[65px] sm:mt-[73px]">
          <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl font-bold">
            Medical Conditions <br /> Directory
          </h1>
        </aside>

        <main className="w-full mt-16 md:mt-24 px-4 sm:px-8 md:px-12 pb-8">
          {/* Alphabet navigation */}
          <div className="sticky top-14 z-30 bg-white py-4 border-b shadow-sm">
            <div className="flex flex-wrap justify-center">
              {alphabets.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleScroll(letter)}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#04DA8D] hover:text-white transition-colors font-semibold text-sm sm:text-base cursor-pointer"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Loading and error states */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading medical conditions...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Conditions listed by alphabet */}
          <div className="mt-8">
            {alphabets.map((letter) => {
              const lowerCaseLetter = letter.toLowerCase();
              return (
                <div
                  key={letter}
                  id={lowerCaseLetter}
                  ref={(el) => (sectionRefs.current[lowerCaseLetter] = el)}
                  className="mb-10 scroll-mt-28"
                >
                  <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
                    {letter}
                  </h2>
                  {conditionsByLetter[letter] && conditionsByLetter[letter].length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {conditionsByLetter[letter].map((condition, index) => (
                        <Link
                          key={index}
                          to={`/conditions/${condition.slug}`}
                          className="block p-4 bg-white rounded-lg shadow-sm border hover:border-[#04DA8D] transition-colors cursor-pointer"
                        >
                          <h3 className="font-medium text-base text-gray-800">{condition.name}</h3>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No conditions listed for this letter</p>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Conditions;