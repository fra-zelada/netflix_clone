import { BsSearch } from "react-icons/bs";
import { useCallback, useRef, useState } from "react";

export const SearchButton = () => {
    const [showInput, setShowInput] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const toggleSearch = useCallback(() => {
        setShowInput((prev) => !prev);
    }, []);

    return (
        <div className="flex items-center">
            <input
                type="text"
                className={`w-full px-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300 transition-transform duration-500 ${
                    showInput
                        ? "transform translate-x-0 visible"
                        : "transform translate-x-full invisible"
                }`}
                ref={ref}
                onBlur={toggleSearch}
                placeholder="Search..."
            />
            <BsSearch onClick={toggleSearch} className="ml-1" />
        </div>
    );
};
