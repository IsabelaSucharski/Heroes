import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Actions } from '../../components/Actions';
import { vi } from 'vitest';

describe('Actions', () => {
  const defaultProps = {
    open: true,
    anchorEl: document.body,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onClose: vi.fn(),
    onActivate: vi.fn(),
    heroActive: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getSwitch = () =>
    document.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;

  it('deve renderizar os itens do menu', () => {
    render(<Actions {...defaultProps} />);

    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Excluir')).toBeInTheDocument();
    expect(getSwitch()).toBeInTheDocument();
  });

  it('deve chamar onEdit ao clicar em Editar', async () => {
    const user = userEvent.setup();

    render(<Actions {...defaultProps} />);

    await user.click(screen.getByText('Editar'));

    expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onDelete ao clicar em Excluir', async () => {
    const user = userEvent.setup();

    render(<Actions {...defaultProps} />);

    await user.click(screen.getByText('Excluir'));

    expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onActivate ao clicar no switch', async () => {
    const user = userEvent.setup();

    render(<Actions {...defaultProps} />);

    await user.click(getSwitch());

    expect(defaultProps.onActivate).toHaveBeenCalled();
  });

  it('deve deixar o switch marcado quando heroActive for true', () => {
    render(<Actions {...defaultProps} heroActive />);

    expect(getSwitch()).toBeChecked();
  });

  it('deve deixar o switch desmarcado quando heroActive for false', () => {
    render(<Actions {...defaultProps} heroActive={false} />);

    expect(getSwitch()).not.toBeChecked();
  });

  it('deve desabilitar Editar e Excluir quando heroActive for false', () => {
    render(<Actions {...defaultProps} heroActive={false} />);

    expect(screen.getByText('Editar').closest('li')).toHaveAttribute(
      'aria-disabled',
      'true'
    );

    expect(screen.getByText('Excluir').closest('li')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
});