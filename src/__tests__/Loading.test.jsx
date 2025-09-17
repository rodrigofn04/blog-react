import { render, screen } from '@testing-library/react';
import Loading from '../components/Loading'; // componente que você pode ter

describe('Loading component', () => {
  test('exibe texto de carregando', () => {
    render(<Loading />);
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });
});
