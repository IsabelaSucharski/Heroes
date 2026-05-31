import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteHero, getHeroes, updateHero } from '../services/api';
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

export type HeroFormPayload = {
    name: string;
    nickname: string;
    date_of_birth: string;
    universe: string;
    main_power: string;
    avatar_url: string;
};

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

export function useDeleteHero() {
    const { trigger, isMutating, error } = useSWRMutation('/heroes', async (_key: string, { arg }: { arg: string }) => {
        if (!arg) {
            throw new Error('Hero id is required for delete');
        }

        return deleteHero(arg);
    });

    return {
        deleteHero: trigger,
        isDeleting: isMutating,
        deleteError: error,
    };
}

export function useUpdateHero() {
    const { trigger, isMutating, error } = useSWRMutation('/heroes', async (_key: string, { arg }: { arg: { heroId: string; payload: HeroFormPayload } }) => {
        if (!arg?.heroId || !arg.payload) {
            throw new Error('Hero id and payload are required for update');
        }

        return updateHero(arg.heroId, arg.payload);
    });

    return {
        updateHero: trigger,
        isUpdating: isMutating,
        updateError: error,
    };
}


