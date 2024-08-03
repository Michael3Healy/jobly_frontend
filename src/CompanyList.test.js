// src/CompanyList.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter as Router, useNavigate } from 'react-router-dom'; // Wrap with Router for routing-related components
import CompanyList from './CompanyList';
import JoblyApi from './api';

// Mock JoblyApi
jest.mock('./api');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CompanyList', () => {
	// Helper function to render the component with Router context
	const renderComponent = () => {
		render(
			<Router>
				<CompanyList />
			</Router>
		);
	};

	test('renders loading state initially', async () => {
		JoblyApi.getAllCompanies.mockResolvedValue([]); // Mocking API call
		renderComponent();
		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeInTheDocument();
		});
	});

	test('renders error message if API call fails', async () => {
		JoblyApi.getAllCompanies.mockRejectedValue('Failed to fetch companies'); // Mock API error
		renderComponent();
		expect(await screen.findByText('Error: Failed to fetch companies')).toBeInTheDocument();
	});

	test('renders company cards when API call is successful', async () => {
		// Mock successful API response
		JoblyApi.getAllCompanies.mockResolvedValue([
			{ handle: 'comp1', name: 'Company 1', description: 'Description 1', numEmployees: 10 },
			{ handle: 'comp2', name: 'Company 2', description: 'Description 2', numEmployees: 20 },
		]);
		renderComponent();
		expect(await screen.findByText('Company 1')).toBeInTheDocument();
		expect(screen.getByText('Company 2')).toBeInTheDocument();
	});

	test('handles form submission and updates URL with search term', async () => {
		JoblyApi.getAllCompanies.mockResolvedValue([]); // Mock API call
		renderComponent();

		// Type into the search input and submit the form
		await waitFor (() => fireEvent.change(screen.getByPlaceholderText('Enter search term...'), { target: { value: 'test' } }));
		await waitFor (() => fireEvent.click(screen.getByText('Submit')));

		// Check if navigate is called with correct URL
		expect(mockNavigate).toHaveBeenCalledWith('/companies?name=test');
	});
});
