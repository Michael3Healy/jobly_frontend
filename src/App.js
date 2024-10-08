import RoutesList from './Routes';
import NavBar from './NavBar';
import './App.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import { jwtDecode } from 'jwt-decode';
import UserContext from './userContext';
import useLocalStorage from './hooks/useLocalStorage';
import ErrorAlert from './ErrorAlert';

// Main component for the application.
function App() {

	// Token initialized to the token stored in local storage, or an empty string if no token is stored. Same for currUser.
	const [token, setToken] = useLocalStorage('token', '');

	// currUser = {username, firstName, lastName, email, isAdmin, applications}
	const [currUser, setCurrUser] = useLocalStorage('currUser', {});
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetches the user data based on the token.
		const fetchUser = async () => {
			try {
				const decodedToken = jwtDecode(token);
				const username = decodedToken.username;

				const user = await JoblyApi.getUser(username); // returns { username, firstName, lastName, email, isAdmin, applications }
				setCurrUser(user);
			} catch (err) {
				console.error('Error fetching user: ', err);
			}
		};

		if (token) {

			// Sets the token in the JoblyApi class  so requests are authenticaed and fetches the user data.
			JoblyApi.token = token;
			fetchUser();
		}
		// eslint to ignore the warning about the dependency array not including setCurrUser. Including it would cause an infinite loop.
		// eslint-disable-next-line
	}, [token]);

	// Logs in the user with the provided username and password.
	const login = async ({ username, password }) => {
		try {
			const newToken = await JoblyApi.login(username, password);
			setToken(newToken);
			JoblyApi.token = newToken;
			setError(null);
		} catch (err) {
			setError(err);
		}
	};

	// Signs up the user with the provided information.
	const signup = async ({ username, password, firstName, lastName, email }) => {
		try {
			const newToken = await JoblyApi.signup(username, password, firstName, lastName, email);
			setToken(newToken);
			JoblyApi.token = newToken;
			setError(null);
		} catch (err) {
			setError(err);
		}
	};

	// Logs out the current user.
	const logout = (e) => {
		setCurrUser({});
		JoblyApi.token = '';
		setToken('');
	};

	return (

		// UserContext.Provider is used to provide the current user and the setCurrUser function to all child components.
		<UserContext.Provider value={{ currUser, setCurrUser }}>
			<div className='App'>
				<NavBar logout={logout} />
				<main className='App-main'>
					{error && <ErrorAlert message={error} />}
					<RoutesList login={login} signup={signup} />
				</main>
			</div>
		</UserContext.Provider>
	);
}

export default App;
