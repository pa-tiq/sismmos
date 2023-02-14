import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import MainHeader from './MainHeader';


describe('MainHeader.js', () => {
  test('renders MainHeader.js', () => {
    // Arrange
    render(<Router><MainHeader /></Router>);
  
    // Act
  
    // Assert
    const linkElement = screen.getByText(/SisMMOS/i);
    expect(linkElement).toBeInTheDocument();
  });
})


