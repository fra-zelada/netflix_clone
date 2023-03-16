import  useSWR  from 'swr';
import { fetcher } from '../lib/fetcher';
import { IMovie } from '../interfaces/IMovie';


export const useFavorites = () => {
        
    const { data, error , isLoading, mutate} = useSWR<IMovie[]>( '/api/favorites', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return { data, error , isLoading, mutate};
};