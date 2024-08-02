import RoutesList from './Routes';
import NavBar from './NavBar';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import { jwtDecode } from 'jwt-decode';
import UserContext from './userContext';
import useLocalStorage from './hooks/useLocalStorage';
import ErrorAlert from './ErrorAlert';

function App() {
	const [token, setToken] = useLocalStorage('token', '');
	const [currUser, setCurrUser] = useLocalStorage('currUser', {});
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const decodedToken = jwtDecode(token);
				const username = decodedToken.username;

				const user = await JoblyApi.getUser(username);
				setCurrUser(user);
			} catch (err) {
				console.error('Error fetching user: ', err);
			}
		};
		if (token) {
			JoblyApi.token = token;
			fetchUser();
		}
	}, [token]);

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

	const logout = () => {
		setCurrUser({});
		JoblyApi.token = '';
		setToken('');
		navigate('/');
	};

	return (
		<UserContext.Provider value={currUser}>
			<div className='App'>
				<NavBar logout={logout} />
				<main>
					{error && <ErrorAlert message={error} />}
					<RoutesList login={login} signup={signup} />
				</main>
			</div>
		</UserContext.Provider>
	);
}

export default App;
