import { useEffect, useState } from 'react';
import JoblyApi from './api';
import { Link } from 'react-router-dom';
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
	{
		id, title, salary, equity, companyHandle, companyName;
	}
	return (
		<div className='JobList'>
			{jobs.map(j => (
				<Link>
					<JobCard key={j.id} id={j.id} title={j.title} salary={j.salary} equity={j.equity} companyHandle={j.companyHandle} companyName={j.companyName} />
				</Link>
			))}
		</div>
	);
};

export default JobList;
