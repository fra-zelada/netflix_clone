import { useInfoModal } from "@/hooks";
import { FC, PropsWithChildren } from "react";
import { Billboard, InfoModal, Navbar } from ".";

interface MainLayoutProps {
    showBillboard?: boolean;
}

const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
    children,
    showBillboard = false,
}) => {
    const { isOpen, closeModal } = useInfoModal();
    return (
        <>
            <InfoModal
                visible={isOpen}
                onClose={() => {
                    closeModal();
                }}
            />
            <Navbar />
            {showBillboard ? <Billboard /> : <div className="h-[30%] "></div>}
            <div className="pb-40">{children}</div>
        </>
    );
};

export default MainLayout;
