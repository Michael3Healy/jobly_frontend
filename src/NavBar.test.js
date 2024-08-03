import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import UserContext from './userContext';
import { MemoryRouter } from 'react-router-dom';

// Mock logout function
const mockLogout = jest.fn();

describe('NavBar Component', () => {
	test('renders logged-in links when user is logged in', () => {
		const user = { username: 'testuser' };

		render(
			<UserContext.Provider value={{ currUser: user }}>
				<MemoryRouter>
					<NavBar logout={mockLogout} />
				</MemoryRouter>
			</UserContext.Provider>
		);

		expect(screen.getByText('Companies')).toBeInTheDocument();
		expect(screen.getByText('Jobs')).toBeInTheDocument();
		expect(screen.getByText('Profile')).toBeInTheDocument();
		expect(screen.getByText('Logout')).toBeInTheDocument();
	});

	test('renders anonymous links when user is not logged in', () => {
		render(
			<UserContext.Provider value={{ currUser: {} }}>
				<MemoryRouter>
					<NavBar logout={mockLogout} />
				</MemoryRouter>
			</UserContext.Provider>
		);

		expect(screen.getByText('Login')).toBeInTheDocument();
		expect(screen.getByText('Signup')).toBeInTheDocument();
		expect(screen.queryByText('Companies')).not.toBeInTheDocument();
		expect(screen.queryByText('Jobs')).not.toBeInTheDocument();
		expect(screen.queryByText('Profile')).not.toBeInTheDocument();
		expect(screen.queryByText('Logout')).not.toBeInTheDocument();
	});

	test('calls logout function when logout link is clicked', () => {
		const user = { username: 'testuser' };

		render(
			<UserContext.Provider value={{ currUser: user }}>
				<MemoryRouter>
					<NavBar logout={mockLogout} />
				</MemoryRouter>
			</UserContext.Provider>
		);

		const logoutLink = screen.getByText('Logout');
		fireEvent.click(logoutLink);

		expect(mockLogout).toHaveBeenCalledTimes(1);
	});
});
