import useSWR from 'swr'
import { fetcher } from '../lib/';
import { IUser } from '../interfaces/IUser';

export const useCurrentUser = () => {
        
    const { data, error, isLoading, mutate } = useSWR<IUser>('/api/current', fetcher)


    return {
        data, error, isLoading, mutate
    }

};