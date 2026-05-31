import useSWR from 'swr';
import { getHeroes } from '../services/api';
import type { Hero } from '../types/hero';

export interface HeroesQueryParams {
    name?: string;
    universe?: string;
    page?: number;
    limit?: number;
    [key: string]: string | number | undefined;
}

export interface HeroesResponse {
    data: Hero[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    filters?: {
        universe?: string | null;
        name?: string | null;
    };
}

export function useHeroes(params?: HeroesQueryParams) {
    const buildUrl = () => {
        let url = '/heroes';
        if (params && Object.keys(params).length > 0) {
            const queryString = Object.entries(params)
                .filter(([, value]) => value !== undefined && value !== '')
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
                .join('&');
            if (queryString) url += `?${queryString}`;
        }
        return url;
    };

    const url = buildUrl();
    const { data, error, isLoading, mutate } = useSWR<HeroesResponse>(url, getHeroes);

    return {
        heroes: data?.data ?? [],
        page: data?.page,
        limit: data?.limit,
        total: data?.total,
        totalPages: data?.totalPages,
        isLoading,
        error,
        refresh: mutate,
    };
}

