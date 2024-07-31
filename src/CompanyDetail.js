import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCard from './JobCard';

const CompanyDetail = () => {
	const { handle } = useParams();
	const [company, setCompany] = useState({});
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCompanyData = async () => {
			try {
				const fetchedCompany = await JoblyApi.getCompany(handle);
				setCompany(fetchedCompany);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCompanyData();
	}, []);

	if (isLoading) return <div>Loading&hellip;</div>;

	if (error) return <div>Error: {error}</div>;

	return (
		<div className='CompanyDetail'>
			<h1>{company.name}</h1>
			<h2>{company.description}</h2>
			<div>
				{company.jobs.map(j => (
					<JobCard key={j.id} title={j.title} salary={j.salary} equity={j.equity} />
				))}
			</div>
		</div>
	);
};

export default CompanyDetail;
