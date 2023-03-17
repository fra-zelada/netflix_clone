import { BsFillPlayFill, BsSearch } from "react-icons/bs";
import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from "react";
import debounce from "just-debounce-it";
import NextLink from "next/link";

import axios from "axios";
import { IMovie } from "@/interfaces/IMovie";

export const SearchButton: FC = () => {
    const [showInput, setShowInput] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [movieResults, setMovieResults] = useState<IMovie[]>([]);
    const ref = useRef<HTMLInputElement>(null);

    const logText = async (text: string) => {
        if (text.length > 0) {
            const movies = await axios.get<IMovie[]>(`/api/search/${text}`);
            if (movies.data.length > 0) {
                setMovieResults(movies.data);
            } else {
                setMovieResults([]);
            }
        } else {
            setMovieResults([]);
        }
    };

    const debouncedSearch = useMemo(
        () => debounce((search: string) => logText(search), 500),
        []
    );

    // const debouncedSearch = useCallback(
    //     debounce((search: string) => logText(search), 500),
    //     []
    // );

    const toggleSearch = useCallback(() => {
        setShowInput((prev) => !prev);
        if (!showInput) {
            setMovieResults([]);
            setSearchTerm("");
        }
    }, [showInput]);

    const handleInputSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const newSearch = ev.target.value;
        setSearchTerm(newSearch);
        debouncedSearch(newSearch);
    };

    return (
        <div
            className="flex items-start relative"
            // onBlur={toggleSearch}
        >
            <div
                className={` relative transition-transform duration-500 ${
                    showInput
                        ? "transform translate-x-0 visible"
                        : "transform translate-x-full invisible"
                }`}
            >
                <div className="flex items-center">
                    <input
                        value={searchTerm}
                        onChange={(ev) => handleInputSearchChange(ev)}
                        type="text"
                        className={` relative w-full px-3 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300 
                    transition-transform duration-500 ${
                        showInput
                            ? "transform translate-x-0 visible"
                            : "transform translate-x-full invisible"
                    }`}
                        ref={ref}
                        // onBlur={toggleSearch}
                        placeholder="Search..."
                    />
                </div>
                {movieResults.length > 0 && (
                    <div className="absolute top-10">
                        {/* <h3 className="mt-2 text-sm">{`${searchTerm}:`}</h3> */}
                        <ul className="bg-white border border-gray-100 w-full mt-2">
                            {movieResults.slice(0, 3).map((movie) => (
                                <NextLink
                                    key={movie.id}
                                    href={`/watch/${movie.id}`}
                                    passHref
                                >
                                    <li className="text-neutral-500 flex items-center pl-1 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                                        <BsFillPlayFill
                                            size={15}
                                            className="mr-1"
                                        />{" "}
                                        {movie.title}
                                    </li>
                                </NextLink>
                            ))}
                            <NextLink href={`/search/${searchTerm}`}>
                                <li className="text-neutral-500 flex items-center pl-1 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                                    <BsSearch className="mr-1" />

                                    {`All results for ${searchTerm}... `}
                                </li>
                            </NextLink>
                        </ul>
                    </div>
                )}
                {/*  */}
            </div>
            <BsSearch onClick={toggleSearch} className="ml-1 mt-3" />
        </div>
    );
};
