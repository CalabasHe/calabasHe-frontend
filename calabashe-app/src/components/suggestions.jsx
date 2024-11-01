export const SpecialtySuggestions = ({ specialtySuggests, onSelect }) => {
    return (
        <div className="absolute top-10 w-full mt-1 shadow-lg z-10 bg-white rounded-md overflow-y-auto scrollbar-thin max-h-[400px]">
            {specialtySuggests
                && specialtySuggests.length > 0
                &&
                <>
                    <h3 className="text-gray-600 font-semibold m-2">Specialties</h3>
                    {specialtySuggests.map((suggestion, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 p-3 mb-1 hover:bg-blue-100 cursor-pointer transition duration-150 ease-in-out rounded-md"
                            onClick={() => {
                                console.log("Suggestion clicked:", suggestion);
                                onSelect(suggestion);
                            }}
                            
                        >
                            {suggestion}
                        </div>
                    ))}
                </>
            }
        </div>
    );
};

export const SearchQuery = ({ conditionSuggestions, onSelect }) => {
    return (
        <div className="absolute top-10 w-full mt-1 shadow-lg z-10 bg-white rounded-md overflow-y-auto scrollbar-thin max-h-[400px]">
            {conditionSuggestions
                && conditionSuggestions.length > 0
                &&
                <>
                    <h3 className="text-gray-600 font-semibold m-2">Conditions</h3>
                    {conditionSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 p-3 mb-1 hover:bg-blue-100 cursor-pointer transition duration-150 ease-in-out rounded-md"
                            onClick={() => {
                                onSelect(suggestion);
                            }}
                            
                        >
                            {suggestion}
                        </div>
                    ))}
                </>
            }
        </div>
    );
};

