import { renderHook } from '@testing-library/react';
import useSWRMutation from 'swr/mutation';
import { useUpdateHero } from '../../hooks/useHeroes';
import { vi, type Mock } from 'vitest';

vi.mock('swr/mutation');

const mockedUseSWRMutation = useSWRMutation as Mock;

describe('useUpdateHero', () => {
  it('deve retornar trigger e estados corretamente', () => {
    const trigger = vi.fn();

    mockedUseSWRMutation.mockReturnValue({
      trigger,
      isMutating: false,
      error: null,
    });

    const { result } = renderHook(() => useUpdateHero());

    expect(result.current.updateHero).toBe(trigger);
    expect(result.current.isUpdating).toBe(false);
    expect(result.current.updateError).toBeNull();
  });
});