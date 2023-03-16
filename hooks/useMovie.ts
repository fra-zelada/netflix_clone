import  useSWR  from 'swr';
import { fetcher } from '../lib/fetcher';
import { IMovie } from '../interfaces/IMovie';



export const useMovie = (id : string) => {
        
    const { data, error , isLoading} = useSWR<IMovie>(id ? `/api/movies/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect:false
    })

    return {
        data, error, isLoading
    }

};
