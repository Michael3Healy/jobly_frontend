import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCard from './JobCard';
import './CompanyDetail.css';

// Component for the detail page of a company. Fetches the company data from the backend and displays it.
const CompanyDetail = () => {
	const { handle } = useParams();
	const [company, setCompany] = useState({});
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCompanyData = async () => {
			try {

				// returns { handle, name, description, numEmployees, logoUrl, jobs: [ { id, title, salary, equity }, ... ] }
				const fetchedCompany = await JoblyApi.getCompany(handle); 
				
				setCompany(fetchedCompany);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCompanyData();
	}, [handle]);

	if (isLoading) return <div>Loading&hellip;</div>;

	if (error) return <div>Error: {error}</div>;

	return (
		<div className='CompanyDetail container'>
			<div className='col-12 mt-4'>
				<h1 className='fs-3'>{company.name}</h1>
				<h2 className='fs-4 mb-4'>{company.description}</h2>
				<div>
					{company.jobs.map(j => (
						<JobCard key={j.id} id={j.id} title={j.title} salary={j.salary} equity={j.equity} />
					))}
				</div>
			</div>
		</div>
	);
};

export default CompanyDetail;
