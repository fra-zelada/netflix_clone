import NextLink from "next/link";
import { AccountMenu, MobileMenu, NavbarItem } from ".";
import { BsBell, BsChevronDown } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import { SearchButton } from "./SearchButton";

const TOP_OFFSET = 66;

export const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((prev) => !prev);
    }, []);
    const toggleAccountMenuMenu = useCallback(() => {
        setShowAccountMenu((prev) => !prev);
    }, []);

    return (
        <nav className="w-full fixed z-40">
            <div
                className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500  ${
                    showBackground ? "bg-zinc-900 bg-opacity-90" : ""
                }`}
            >
                <NextLink href={"/"} passHref>
                    <picture>
                        <img
                            className="h-4 lg:h-7"
                            src="/images/logo.png"
                            alt="logo"
                        />
                    </picture>
                </NextLink>
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label={"Home"} />
                    <NavbarItem label={"Series"} />
                    <NavbarItem label={"Films"} />
                    <NavbarItem label={"My List"} />
                    <NavbarItem label={"New & Popular"} />
                    <NavbarItem label={"Browse by languages"} />
                </div>
                <div
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
                >
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown
                        className={`text-white transition ${
                            showMobileMenu ? "rotate-180" : "rotate-0"
                        }`}
                    />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        {/* <BsSearch /> */}
                        <SearchButton />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div
                        onClick={toggleAccountMenuMenu}
                        className="flex flex-row items-center gap-2 cursor-pointer relative"
                    >
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <picture>
                                <img
                                    src="/images/default-blue.png"
                                    alt="Profile"
                                />
                            </picture>
                        </div>
                        <BsChevronDown
                            className={`text-white transition ${
                                showAccountMenu ? "rotate-180" : "rotate-0"
                            } `}
                        />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    );
};
