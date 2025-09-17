import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary'; // se tiver

function Bomb() {
  throw new Error('Falha forçada');
}

describe('ErrorBoundary', () => {
  test('captura erro e exibe fallback', () => {
    render(
      <ErrorBoundary fallback={<div>Erro aconteceu</div>}>
        <Bomb />
      </ErrorBoundary>
    );
    expect(screen.getByText('Erro aconteceu')).toBeInTheDocument();
  });
});
