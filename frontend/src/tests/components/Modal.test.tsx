import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@mui/material';
import { Modal } from '../../components/Modal';
import { vi } from 'vitest';

describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o título', () => {
    render(
      <Modal
        open
        onClose={onClose}
        title="Meu Modal"
      />
    );

    expect(
      screen.getByText('Meu Modal')
    ).toBeInTheDocument();
  });

  it('deve renderizar children', () => {
    render(
      <Modal
        open
        onClose={onClose}
      >
        <p>Conteúdo do modal</p>
      </Modal>
    );

    expect(
      screen.getByText('Conteúdo do modal')
    ).toBeInTheDocument();
  });

  it('deve renderizar actions', () => {
    render(
      <Modal
        open
        onClose={onClose}
        actions={<Button>Salvar</Button>}
      />
    );

    expect(
      screen.getByRole('button', {
        name: 'Salvar',
      })
    ).toBeInTheDocument();
  });

  it('não deve renderizar children quando não informado', () => {
    render(
      <Modal
        open
        onClose={onClose}
      />
    );

    expect(
      screen.queryByText('Conteúdo do modal')
    ).not.toBeInTheDocument();
  });

  it('não deve renderizar actions quando não informado', () => {
    render(
      <Modal
        open
        onClose={onClose}
      />
    );

    expect(
      screen.queryByRole('button')
    ).not.toBeInTheDocument();
  });

  it('deve chamar onClose ao pressionar ESC', () => {
    render(
      <Modal
        open
        onClose={onClose}
        title="Meu Modal"
      />
    );

    fireEvent.keyDown(
      screen.getByRole('dialog'),
      {
        key: 'Escape',
        code: 'Escape',
      }
    );

    expect(onClose).toHaveBeenCalled();
  });
});