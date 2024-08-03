import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './userContext';
import './Home.css';

// Component for the home page. Displays a welcome message if the user is logged in, otherwise displays a login and signup button.
const Home = () => {
	const { currUser } = useContext(UserContext);

	const welcomeMsg = <h2>Welcome Back, {currUser.username}</h2>;
	const signupMsg = (
		<div>
			<Link to='/login'>
				<button className='btn Home-btn'>Login</button>
			</Link>
			<Link to='/signup'>
				<button className='btn Home-btn'>Sign Up</button>
			</Link>
		</div>
	);

	const homePage = currUser.username ? welcomeMsg : signupMsg;
	return (
		<div className='Home'>
			<div className='row'>
				<div className='col-12'>
					<h1 className='fs-1'>Jobly</h1>
					<h2 className='fs-2'>All the jobs in one, convenient place.</h2>
					{homePage}
				</div>
			</div>
		</div>
	);
};

export default Home;
