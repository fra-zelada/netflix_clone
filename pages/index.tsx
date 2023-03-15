import { Billboard, Navbar } from "@/components";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

interface Props {
    user: any;
}

export default function Home({}: Props) {
    return (
        <>
            <Navbar />
            <Billboard />
        </>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }
    // const { data: user } = useCurrentUser();

    return {
        props: {
            // user
        },
    };
};
