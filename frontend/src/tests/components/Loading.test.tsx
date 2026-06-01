import { render, screen } from '@testing-library/react';
import Loading from '../../components/Loading';

describe('Loading', () => {
  it('deve renderizar o indicador de carregamento', () => {
    render(<Loading />);

    expect(
      screen.getByLabelText(/loading/i)
    ).toBeInTheDocument();
  });
});