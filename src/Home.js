import { Link } from 'react-router-dom';

const Home = () => {
	const currUser = false;
	const welcomeMsg = <h2>Welcome Back, {currUser.username}</h2>;
	const signupMsg = (
		<div>
			<Link to='/login'>
				<button className='btn btn-success'>Login</button>
			</Link>
			<Link to='/signup'>
				<button className='btn btn-info'>Sign Up</button>
			</Link>
		</div>
	);

	const homePage = currUser ? welcomeMsg : signupMsg;
	return (
		<div>
			<h1>Jobly</h1>
			<h4>All the jobs in one, convenient place.</h4>
			{homePage}
		</div>
	);
};

export default Home;