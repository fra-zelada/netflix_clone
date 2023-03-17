import  useSWR  from 'swr';

import { fetcher } from '../lib/';
import { IMovie } from '../interfaces/IMovie';
export const useSearchMovie = ( movieName : string ) => {
    
    const { data, isLoading, error } = useSWR<IMovie[]>(`/api/search/${movieName}`, fetcher, {})


    return { data, isLoading, error}

};