import { render, screen } from '@testing-library/react';
import Footer from './commonComponents/AlbumFooter';

test('renders learn react link', () => {
  render(<Footer />);
  const linkElement = screen.getByText("BootCamps 2023");
  expect(linkElement).toBeInTheDocument();
});
