import { renderHook } from '@testing-library/react';
import useSWRMutation from 'swr/mutation';
import { useDeleteHero } from '../../hooks/useHeroes';
import { vi, type Mock } from 'vitest';


vi.mock('swr/mutation');

const mockedUseSWRMutation = useSWRMutation as Mock;

describe('useDeleteHero', () => {
  it('deve retornar trigger e estados corretamente', () => {
    const trigger = vi.fn();

    mockedUseSWRMutation.mockReturnValue({
      trigger,
      isMutating: true,
      error: null,
    });

    const { result } = renderHook(() => useDeleteHero());

    expect(result.current.deleteHero).toBe(trigger);
    expect(result.current.isDeleting).toBe(true);
    expect(result.current.deleteError).toBeNull();
  });
});