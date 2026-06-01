import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroCard } from '../../components/HeroCard';
import type { ActionsProps } from '../../components/Actions';
import type { Hero } from '../../types/hero';
import type { ModalProps } from '../../components/Modal';
import { vi } from 'vitest';

vi.mock('../../components/Actions', () => ({
  Actions: ({
    onEdit,
    onDelete,
    onActivate,
  }: ActionsProps
) => (
    <div>
      <button onClick={onEdit}>mock-edit</button>
      <button onClick={onDelete}>mock-delete</button>
      <button onClick={onActivate}>mock-activate</button>
    </div>
  ),
}));

vi.mock('../../components/Modal', () => ({
  Modal: ({
    open,
    title,
    actions,
  }: ModalProps) =>
    open ? (
      <div>
        <h1>{title}</h1>
        {actions}
      </div>
    ) : null,
}));

describe('HeroCard', () => {
  const hero = {
    id: '1',
    name: 'Batman',
    nickname: 'Morcego',
    universe: 'DC',
    main_power: 'Dinheiro',
    avatar_url: 'avatar.jpg',
    date_of_birth: '1939-05-01',
    is_active: true,
  } as Hero;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o nome do herói', () => {
    render(<HeroCard hero={hero} />);

    expect(screen.getByText('Batman')).toBeInTheDocument();
  });

  it('deve chamar onEdit', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <HeroCard
        hero={hero}
        onEdit={onEdit}
      />
    );

    await user.click(
      screen.getByText('mock-edit')
    );

    expect(onEdit).toHaveBeenCalledWith(hero);
  });

  it('deve chamar onViewDetails ao clicar no card', async () => {
    const user = userEvent.setup();
    const onViewDetails = vi.fn();

    render(
      <HeroCard
        hero={hero}
        onViewDetails={onViewDetails}
      />
    );

    await user.click(screen.getByText('Batman'));

    expect(onViewDetails).toHaveBeenCalledWith(hero);
  });

  it('deve abrir modal de exclusão', async () => {
    const user = userEvent.setup();

    render(<HeroCard hero={hero} />);

    await user.click(
      screen.getByText('mock-delete')
    );

    expect(
      screen.getByText(
        'Deseja deletar o herói Batman?'
      )
    ).toBeInTheDocument();
  });

  it('deve abrir modal de ativação', async () => {
    const user = userEvent.setup();

    render(<HeroCard hero={hero} />);

    await user.click(
      screen.getByText('mock-activate')
    );

    expect(
      screen.getByText(
        'Deseja desativar o herói Batman?'
      )
    ).toBeInTheDocument();
  });

  it('deve exibir status inativo', () => {
    render(
      <HeroCard
        hero={{
          ...hero,
          is_active: false,
        }}
      />
    );

    expect(
      screen.getByText('Inativo')
    ).toBeInTheDocument();
  });

  it('deve executar exclusão confirmada', async () => {
    const user = userEvent.setup();

    const onDelete = vi.fn();
    const onDeleteSuccess = vi.fn();

    render(
      <HeroCard
        hero={hero}
        onDelete={onDelete}
        onDeleteSuccess={onDeleteSuccess}
      />
    );

    await user.click(
      screen.getByText('mock-delete')
    );

    await user.click(
      screen.getByText('Deletar')
    );

    expect(onDelete).toHaveBeenCalledWith('1');
    expect(onDeleteSuccess).toHaveBeenCalled();
  });

  it('deve executar ativação/desativação confirmada', async () => {
    const user = userEvent.setup();

    const onActivate = vi.fn();

    render(
      <HeroCard
        hero={hero}
        onActivate={onActivate}
      />
    );

    await user.click(
      screen.getByText('mock-activate')
    );

    await user.click(
      screen.getByText('Desativar')
    );

    expect(onActivate).toHaveBeenCalledWith(
      '1',
      false
    );
  });
});