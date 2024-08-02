import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'
import JobList from './JobList'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Profile from './Profile'
import { useContext } from 'react';
import UserContext from './userContext';


const RoutesList = ({ login, signup }) => {
	const { currUser } = useContext(UserContext);

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/companies' element={currUser.username ? <CompanyList /> : <Navigate to='/login' replace />} />
			<Route path='/companies/:handle' element={currUser.username ? <CompanyDetail /> : <Navigate to='/login' replace />} />
			<Route path='/jobs' element={currUser.username ? <JobList /> : <Navigate to='/login' replace />} />
            <Route path='/login' element={<LoginForm login={login} />} />
            <Route path='/signup' element={<SignupForm signup={signup} />} />
            <Route path='/profile' element={currUser.username ? <Profile /> : <Navigate to='/login' replace />} />
		</Routes>
	);
};

export default RoutesList;