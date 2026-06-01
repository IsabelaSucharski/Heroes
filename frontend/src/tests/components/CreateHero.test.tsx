import { render, screen, fireEvent } from '@testing-library/react';
import { CreateHero } from '../../components/CreateHero';
import { vi } from 'vitest';

describe('CreateHero', () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar todos os campos', () => {
    render(<CreateHero onSubmit={onSubmit} />);

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome de guerra/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/universo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/habilidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url do avatar/i)).toBeInTheDocument();
  });

  it('deve preencher os valores recebidos via props', () => {
    render(
      <CreateHero
        onSubmit={onSubmit}
        values={{
          name: 'Batman',
          nickname: 'Morcego',
          date_of_birth: '1939-05-01',
          universe: 'DC',
          main_power: 'Dinheiro',
          avatar_url: 'avatar.jpg',
        }}
      />
    );

    expect(screen.getByDisplayValue('Batman')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Morcego')).toBeInTheDocument();
    expect(screen.getByDisplayValue('DC')).toBeInTheDocument();
  });

  it('deve mostrar erros de validação ao enviar vazio', () => {
    const { container } = render(
      <CreateHero onSubmit={onSubmit} />
    );

    fireEvent.submit(
      container.querySelector('form') as HTMLFormElement
    );

    expect(
      screen.getByText('Nome completo obrigatório')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Nome de guerra obrigatório')
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('deve enviar os dados válidos', () => {
    const { container } = render(
      <CreateHero onSubmit={onSubmit} />
    );

    fireEvent.change(
      screen.getByLabelText(/nome completo/i),
      {
        target: {
          name: 'name',
          value: 'Batman',
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/nome de guerra/i),
      {
        target: {
          name: 'nickname',
          value: 'Morcego',
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/data de nascimento/i),
      {
        target: {
          name: 'date_of_birth',
          value: '1939-05-01',
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/universo/i),
      {
        target: {
          name: 'universe',
          value: 'DC',
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/habilidade/i),
      {
        target: {
          name: 'main_power',
          value: 'Dinheiro',
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/url do avatar/i),
      {
        target: {
          name: 'avatar_url',
          value: 'avatar.jpg',
        },
      }
    );

    fireEvent.submit(
      container.querySelector('form') as HTMLFormElement
    );

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Batman',
      nickname: 'Morcego',
      date_of_birth: '1939-05-01',
      universe: 'DC',
      main_power: 'Dinheiro',
      avatar_url: 'avatar.jpg',
    });
  });

  it('deve converter data ISO para formato input', () => {
    render(
      <CreateHero
        onSubmit={onSubmit}
        values={{
          date_of_birth: '2026-05-12T00:00:00.000Z',
        }}
      />
    );

    expect(
      screen.getByDisplayValue('2026-05-12')
    ).toBeInTheDocument();
  });

  it('deve limpar formulário após criação', () => {
    const { container } = render(
      <CreateHero onSubmit={onSubmit} />
    );

    const nameInput = screen.getByLabelText(/nome completo/i);

    fireEvent.change(nameInput, {
      target: {
        name: 'name',
        value: 'Batman',
      },
    });

    fireEvent.change(screen.getByLabelText(/nome de guerra/i), {
      target: { name: 'nickname', value: 'Morcego' },
    });

    fireEvent.change(screen.getByLabelText(/data de nascimento/i), {
      target: { name: 'date_of_birth', value: '1939-05-01' },
    });

    fireEvent.change(screen.getByLabelText(/universo/i), {
      target: { name: 'universe', value: 'DC' },
    });

    fireEvent.change(screen.getByLabelText(/habilidade/i), {
      target: { name: 'main_power', value: 'Dinheiro' },
    });

    fireEvent.change(screen.getByLabelText(/url do avatar/i), {
      target: { name: 'avatar_url', value: 'avatar.jpg' },
    });

    fireEvent.submit(
      container.querySelector('form') as HTMLFormElement
    );

    expect(nameInput).toHaveValue('');
  });
});