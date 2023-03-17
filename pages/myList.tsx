import { MovieList } from "@/components";
import MainLayout from "@/components/MainLayout";
import { useFavorites } from "@/hooks";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const SearchResultPage = () => {
    const { data: favorites = [] } = useFavorites();
    return (
        <MainLayout>
            <MovieList data={favorites} title={"My List"} />
        </MainLayout>
    );
};

export default SearchResultPage;

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
