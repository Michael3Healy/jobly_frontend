import { Routes, Route } from 'react-router-dom';
import Home from './Home'
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail'
import JobList from './JobList'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Profile from './Profile'


const RoutesList = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/companies' element={<CompanyList />} />
			<Route path='/companies/:handle' element={<CompanyDetail />} />
			<Route path='/jobs' element={<JobList />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='/profile' element={<Profile />} />
		</Routes>
	);
};

export default RoutesList;