import { render, screen } from '@testing-library/react';
import Post from '../components/Post'; // ajuste se for outro caminho

describe('Post component', () => {
  test('exibe título e autor', () => {
    render(<Post title="Meu Post" author="João" content="Conteúdo aqui" />);
    expect(screen.getByText('Meu Post')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
  });
});
