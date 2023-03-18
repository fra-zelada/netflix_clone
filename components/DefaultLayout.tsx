import Head from "next/head";
import { FC, PropsWithChildren } from "react";

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Head>
                <title>My Netflix Clon</title>
            </Head>
            {children}
        </>
    );
};
