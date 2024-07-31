import RoutesList from './Routes';
import NavBar from './NavBar';
import './App.css';
import { useState, useEffect } from 'react';
import JoblyApi from './api';
import { jwtDecode } from 'jwt-decode';
import UserContext from './userContext';

function App() {
	const [token, setToken] = useState('');
	const [currUser, setCurrUser] = useState({});

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
    if (token) fetchUser();
		
	}, [token]);

	const login = async ({username, password}) => {
		const newToken = await JoblyApi.login(username, password);
		setToken(newToken);
		JoblyApi.token = newToken;

		const newUser = await JoblyApi.getUser(username);
		setCurrUser(newUser);
    console.log(currUser)
	};

	const signup = async (username, password, firstName, lastName, email) => {
		const newToken = await JoblyApi.signup(username, password, firstName, lastName, email);
		setToken(newToken);
		JoblyApi.token = newToken;

		const newUser = await JoblyApi.getUser(username);
		setCurrUser(newUser);
	};

	const logout = () => {
		setCurrUser({});
		JoblyApi.token = '';
		setToken('');
	};

	return (
		<UserContext.Provider value={currUser}>
			<div className='App'>
				<NavBar logout={logout} />
				<main>
					<RoutesList login={login} signup={signup} />
				</main>
			</div>
		</UserContext.Provider>
	);
}

export default App;
