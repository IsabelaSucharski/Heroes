import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { HeroesList } from '../../pages/HeroesList';
import { useHeroes } from '../../hooks/useHeroes';
import type { Hero } from '../../types/hero';
import type { ModalProps } from '../../components/Modal';

vi.mock('../../hooks/useHeroes');

const refreshMock = vi.fn();
const deleteHeroMock = vi.fn();
const updateHeroMock = vi.fn();

vi.mock('../../services/api', () => ({
  createHero: vi.fn(),
}));

vi.mock('../../components/HeroCard', () => ({
  HeroCard: ({ hero, onViewDetails }: { hero: Hero; onViewDetails?: (hero: Hero) => void }) => (
    <button type="button" data-testid="hero-card" onClick={() => onViewDetails?.(hero)}>
      {hero.name}
    </button>
  ),
}));

vi.mock('../../components/Modal', () => ({
  Modal: ({ title, children, open }: ModalProps) =>
    open ? (
      <div data-testid="modal">
        <h2>{title}</h2>
        {children}
      </div>
    ) : null,
}));

vi.mock('../../components/CreateHero', () => ({
  CreateHero: () => <div>CreateHero Form</div>,
}));

vi.mock('../../components/Loading', () => ({
  default: () => <div>Loading...</div>,
}));

const mockedUseHeroes = vi.mocked(useHeroes);

describe('HeroesList', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    mockedUseHeroes.mockReturnValue({
      heroes: [
        {
          id: '1',
          name: 'Batman',
          nickname: 'Morcego',
          date_of_birth: '1990-01-01',
          universe: 'DC',
          main_power: 'Dinheiro',
          avatar_url: 'avatar.jpg',
          is_active: true,
          created_at: '1990-01-01T00:00:00.000Z',
          updated_at: '1990-01-01T00:00:00.000Z',
        },
      ],
      page: 1,
      totalPages: 3,
      total: 1,
      limit: 10,
      error: undefined,
      isLoading: false,
      refresh: refreshMock,
    });

    const hooks = await import('../../hooks/useHeroes');

    vi.spyOn(hooks, 'useDeleteHero').mockReturnValue({
      deleteHero: deleteHeroMock,
      isDeleting: false,
      deleteError: undefined,
    });

    vi.spyOn(hooks, 'useUpdateHero').mockReturnValue({
      updateHero: updateHeroMock,
      isUpdating: false,
      updateError: undefined,
    });
  });

  it('deve renderizar o título', () => {
    render(<HeroesList />);

    expect(
      screen.getByRole('heading', {
        name: 'Heroes Factory',
      })
    ).toBeInTheDocument();
  });

  it('deve renderizar os heróis', () => {
    render(<HeroesList />);

    const cards = screen.getAllByTestId('hero-card');

    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('Batman');
  });

  it('deve abrir modal de detalhes ao clicar no herói', async () => {
    const user = userEvent.setup();

    render(<HeroesList />);

    await user.click(screen.getByRole('button', { name: 'Batman' }));

    expect(
      screen.getByRole('heading', {
        name: 'Detalhes de Batman',
      })
    ).toBeInTheDocument();
  });

  it('deve abrir modal de cadastro', async () => {
    const user = userEvent.setup();

    render(<HeroesList />);

    await user.click(
      screen.getByRole('button', {
        name: /cadastrar herói/i,
      })
    );

    expect(
      screen.getByRole('heading', {
        name: 'Cadastrar Herói',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText('CreateHero Form')
    ).toBeInTheDocument();
  });

  it('deve exibir mensagem quando não houver heróis', () => {
    mockedUseHeroes.mockReturnValue({
      heroes: [],
      page: 1,
      totalPages: 1,
      total: 0,
      limit: 10,
      error: undefined,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(<HeroesList />);

    expect(
      screen.getByText('Nenhum herói encontrado.')
    ).toBeInTheDocument();
  });

  it('deve renderizar loading', () => {
    mockedUseHeroes.mockReturnValue({
      heroes: [],
      page: 1,
      totalPages: 1,
      total: 0,
      limit: 10,
      error: undefined,
      isLoading: true,
      refresh: vi.fn(),
    });

    render(<HeroesList />);

    expect(
      screen.getByText('Loading...')
    ).toBeInTheDocument();
  });

  it('deve habilitar botão de busca quando houver texto', async () => {
    const user = userEvent.setup();

    render(<HeroesList />);

    const input = screen.getByLabelText(
      /buscar por nome ou apelido/i
    );

    await user.type(input, 'Batman');

    await waitFor(() => {
      expect(
        screen.getByRole('button', {
          name: /buscar/i,
        })
      ).toBeEnabled();
    });
  });
});