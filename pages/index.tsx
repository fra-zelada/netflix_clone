import { Billboard, MovieList, Navbar } from "@/components";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useMovieList } from "../hooks/useMovieList";

interface Props {
    user: any;
}

export default function Home({}: Props) {
    const { data: movies = [] } = useMovieList();

    return (
        <>
            <Navbar />
            <Billboard />
            <div className="pb-40">
                <MovieList data={movies} title={"Trending Now"} />
            </div>
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
