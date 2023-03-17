import { MovieList } from "@/components";
import MainLayout from "@/components/MainLayout";

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSearchMovie } from "../../hooks/useSearchMovie";

const SearchResultPage = () => {
    const router = useRouter();
    const { searchTerm } = router.query as { searchTerm: string };
    const { data: movies = [] } = useSearchMovie(searchTerm);

    return (
        <MainLayout>
            <MovieList
                data={movies}
                title={`Search results for ${searchTerm}...`}
            />
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
