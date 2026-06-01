import { renderHook } from '@testing-library/react';
import { useHeroes } from '../../hooks/useHeroes';
import useSWR from 'swr';
import { vi, type Mock } from 'vitest';

vi.mock('swr');
vi.mock('swr/mutation');

const mockedUseSWR = useSWR as unknown as Mock;

describe('useHeroes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar os heróis da API', () => {
    const mutate = vi.fn();

    mockedUseSWR.mockReturnValue({
      data: {
        data: [
          {
            id: '1',
            name: 'Batman',
            nickname: 'Morcego',
          },
        ],
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
      error: null,
      isLoading: false,
      mutate,
    });

    const { result } = renderHook(() => useHeroes());

    expect(result.current.heroes).toHaveLength(1);
    expect(result.current.heroes[0].name).toBe('Batman');
    expect(result.current.page).toBe(1);
    expect(result.current.total).toBe(1);
    expect(result.current.refresh).toBe(mutate);
  });

  it('deve retornar array vazio quando não houver dados', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useHeroes());

    expect(result.current.heroes).toEqual([]);
  });

  it('deve montar a URL com query params', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
    });

    renderHook(() =>
      useHeroes({
        name: 'Batman',
        page: 2,
      }),
    );

    expect(mockedUseSWR).toHaveBeenCalledWith(
      '/heroes?name=Batman&page=2',
      expect.any(Function),
    );
  });

  it('deve ignorar parâmetros vazios', () => {
    mockedUseSWR.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
    });

    renderHook(() =>
      useHeroes({
        name: '',
        universe: undefined,
        page: 1,
      }),
    );

    expect(mockedUseSWR).toHaveBeenCalledWith(
      '/heroes?page=1',
      expect.any(Function),
    );
  });
});