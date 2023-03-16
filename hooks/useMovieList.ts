import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import { IMovie } from '../interfaces/IMovie';

export const useMovieList = () => {
        
    const { data, error, isLoading } = useSWR<IMovie[]>('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    
    return {
        data,
        error,
        isLoading
    }

};