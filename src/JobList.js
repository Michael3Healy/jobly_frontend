import { useEffect, useState } from 'react';
import JoblyApi from './api';
import JobCard from './JobCard';
import './JobList.css';

// Component for the list of all jobs. Fetches the jobs from the backend and displays them as JobCard components.
const JobList = () => {
	const [jobs, setJobs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const fetchedJobs = await JoblyApi.getAllJobs(); // returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
				setJobs(fetchedJobs);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchJobs();
	}, []);

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error: {error}</div>;

	return (
		<div className='JobList container'>
			<div className='row justify-content-center'>
				<div className='col-8'>
					{jobs.map(j => (
						<JobCard key={j.id} id={j.id} title={j.title} salary={j.salary} equity={j.equity || 0} companyName={j.companyName} />
					))}
				</div>
			</div>
		</div>
	);
};

export default JobList;
