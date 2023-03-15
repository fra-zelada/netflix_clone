import { FC } from "react";

interface NavbarItemProps {
    label: string;
}

export const NavbarItem: FC<NavbarItemProps> = ({ label }) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    );
};
