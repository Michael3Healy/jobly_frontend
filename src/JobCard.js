import { useContext } from 'react';
import UserContext from './userContext';
import JoblyApi from './api';


// Component for displaying a job card. Allows the user to apply for the job.
const JobCard = ({ id, title, salary, equity, companyName }) => {
	const { currUser, setCurrUser } = useContext(UserContext);
	const applyForJob = async (e) => {
		// Prevent the form from refreshing the page, then apply for the job and update the user's applications.
		
		e.preventDefault();
		setCurrUser({ ...currUser, applications: [...currUser.applications, id] });
		await JoblyApi.applyToJob(currUser.username, id);
	};
	return (
		<div className='card my-3'>
			<div className='row no-gutters justify-content-end'>
				<div className='col-md-8'>
					<div className='card-body'>
						<h5 className='card-title'>{title}</h5>
						<p className='card-text'>{companyName}</p>
						<p className='card-text text-muted'>Salary: {salary}</p>
						<p className='card-text text-muted'>Equity: {equity}</p>
					</div>
				</div>
				<div className='col-md-2 d-flex align-items-center justify-content-center'>
					{currUser.applications.includes(id) ? (
						<button className='btn btn-success' disabled>
							Applied
						</button>
					) : (
						<button className='btn btn-primary' onClick={applyForJob}>
							Apply
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
export default JobCard;
