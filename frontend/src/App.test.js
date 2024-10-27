// App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Mock the components used in App for isolation
jest.mock('./components/Header', () => () => <div>Header</div>);
jest.mock('./components/Login', () => () => <div>Login</div>);
jest.mock('./components/Register', () => () => <div>Register</div>);
jest.mock('./components/UserInfo', () => () => <div>UserInfo</div>);
jest.mock('./components/Homepage', () => () => <div>Homepage</div>);
jest.mock('./components/MovieInfo', () => () => <div>MovieInfo</div>);
jest.mock('./components/MovieSearch', () => () => <div>MovieSearch</div>);
jest.mock('./components/Browse', () => () => <div>Browse</div>);
jest.mock('./components/WatchList', () => () => <div>Watchlist</div>);
jest.mock('./components/TrendingMovies', () => () => <div>TrendingMovies</div>);
jest.mock('./components/UpcomingMovies', () => () => <div>UpcomingMovies</div>);
jest.mock('./components/movieDetail', () => () => <div>MovieDetail</div>);

describe('App Component', () => {
  beforeEach(() => {
    // Clear the local storage before each test
    localStorage.clear();
  });

  test('renders Header and Login when not logged in', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('redirects to Homepage when logged in', () => {
    localStorage.setItem('token', 'mockToken'); // Simulate a logged-in state

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
  });

  test('redirects to Login for protected routes when not logged in', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Check if navigating to a protected route redirects to Login
    window.history.pushState({}, 'Test user-info', '/user-info');

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('renders protected route when logged in', () => {
    localStorage.setItem('token', 'mockToken'); // Simulate a logged-in state

    render(
      <Router>
        <App />
      </Router>
    );

    // Navigate to a protected route
    window.history.pushState({}, 'Test user-info', '/user-info');

    expect(screen.getByText(/UserInfo/i)).toBeInTheDocument();
  });

  // Additional tests can be added for other routes as needed
});
