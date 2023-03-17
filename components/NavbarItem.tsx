import { FC } from "react";
import NextLink from "next/link";

interface NavbarItemProps {
    label: string;
    path?: string;
}
export const NavbarItem: FC<NavbarItemProps> = ({ label, path = "#" }) => {
    return (
        <NextLink href={path}>
            <div className="text-white cursor-pointer hover:text-gray-300 transition">
                {label}
            </div>
        </NextLink>
    );
};
