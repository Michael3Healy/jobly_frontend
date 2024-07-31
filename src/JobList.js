import { useEffect, useState } from 'react';
import JoblyApi from './api';
import JobCard from './JobCard';

const JobList = () => {
	const [jobs, setJobs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const fetchedJobs = await JoblyApi.getAllJobs();
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
		<div className='JobList'>
			{jobs.map(j => (
					<JobCard key={j.id} title={j.title} salary={j.salary} equity={j.equity || 0} companyName={j.companyName} />
			))}
		</div>
	);
};

export default JobList;