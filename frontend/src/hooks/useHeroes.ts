import useSWR from 'swr';
import { getHeroes } from '../services/api';

export function useHeroes() {
    const { data, error, isLoading, mutate } = useSWR('/heroes', getHeroes);

    return {
        heroes: data ?? [],
        isLoading,
        error,
        refresh: mutate,
    };
}
