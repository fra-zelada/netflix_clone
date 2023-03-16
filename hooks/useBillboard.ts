import useSWR from 'swr'
import { fetcher } from '../lib/fetcher';
import { IMovie } from '../interfaces/IMovie';


export const useBillboard = () => {
        
    const { data, error, isLoading } = useSWR<IMovie>('/api/random', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return {
        data, error, isLoading
    }

};