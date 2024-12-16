import { useEffect, useState } from "react";

const Checkboxes = ({ options, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(["video"]);

    const handleOptionChange = (e) => {
        const val = e.target.value;
        setSelectedOptions((prevSelected) => {
            const newSelected = prevSelected.includes(val)
              ? prevSelected.filter((id) => id !== val)
              : [...prevSelected, val]
            return newSelected
          })        
    }

    useEffect(() => {
        onChange(selectedOptions)
    }, [selectedOptions]);

    return (
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center my-5 w-[94%] mx-auto">
            <h3 className="">Booking Type: </h3>
            {options.map((option, idx) => {
                return (
                    <label key={idx} htmlFor={option.value} className="flex items-center gap-1">
                        <input aria-label={option.value} 
                        type="checkbox" 
                        name={option.value} 
                        id={option.value} 
                        value={option.value}
                        checked={selectedOptions.includes(option.value)}
                        onChange={handleOptionChange}/>
                        <span className="text-gray-700 font-medium select-none group-hover:text-green-600 transition-colors duration-200 ease-in-out">
                            {option.name}
                        </span>
                    </label>
                )
            })
            }
        </div>);
}

export default Checkboxes;