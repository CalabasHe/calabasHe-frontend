import { motion, AnimatePresence } from 'framer-motion';

export const SearchQuery = ({ conditionSuggestions, onSelect }) => {
    const shouldShow = conditionSuggestions && conditionSuggestions.length > 0;
    
    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-10 w-full mt-1 shadow-lg z-10 bg-white rounded-md overflow-y-auto scrollbar-thin max-h-[400px]"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <h3 className="text-gray-600 font-semibold m-2">Conditions</h3>
                    {conditionSuggestions.map((suggestion, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                                duration: 0.2,
                                delay: index * 0.05
                            }}
                            className="border border-gray-300 p-3 mb-1 hover:bg-blue-100 cursor-pointer transition duration-150 ease-in-out rounded-md"
                            onMouseDown={() => onSelect(suggestion)}
                        >
                            {suggestion}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const SpecialtySuggestions = ({ specialtySuggests, onSelect }) => {
    const shouldShow = specialtySuggests && specialtySuggests.length > 0;

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-10 w-full mt-1 shadow-lg z-10 bg-white rounded-md overflow-y-auto scrollbar-thin max-h-[400px]"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <h3 className="text-gray-600 font-semibold m-2">Specialties</h3>
                    {specialtySuggests.map((suggestion, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                                duration: 0.2,
                                delay: index * 0.05
                            }}
                            className="border border-gray-300 p-3 mb-1 hover:bg-blue-100 cursor-pointer transition duration-150 ease-in-out rounded-md"
                            onMouseDown={() => onSelect(suggestion)}
                        >
                            {suggestion}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const LocationSuggestions = ({ locationSuggests, onSelect }) => {
    const shouldShow = locationSuggests && locationSuggests.length > 0;

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-10 w-full mt-1 shadow-lg z-20 bg-white rounded-md overflow-y-auto scrollbar-thin max-h-[400px]"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <h3 className="text-gray-600 font-semibold m-2">Locations</h3>
                    {locationSuggests.map((suggestion, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                                duration: 0.2,
                                delay: index * 0.05
                            }}
                            className="w-full border border-gray-300 p-3 mb-1 hover:bg-blue-100 cursor-pointer transition duration-150 ease-in-out rounded-md"
                            onMouseDown={() => onSelect(suggestion)}
                        >
                            {suggestion}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};