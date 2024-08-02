import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './CompanyList.css';
import useFields from './hooks/useFields';

const CompanyList = () => {
	const [companies, setCompanies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const [formData, handleChange, setFormData] = useFields({ name: '' });

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const updatedFormData = {};
		for (const [key, value] of params.entries()) {
			updatedFormData[key] = value;
		}
		setFormData(data => ({ ...data, ...updatedFormData }));

		const fetchCompanies = async () => {
			try {
				const fetchedCompanies = await JoblyApi.getAllCompanies(updatedFormData);
				setCompanies(fetchedCompanies);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCompanies();
	}, [location.search, setFormData]);

	const handleSubmit = async e => {
		e.preventDefault();
		const searchTerm = formData.name;
		navigate(`/companies?name=${searchTerm}`);
	};

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error: {error}</div>;

	return (
		<div className='CompanyList container'>
			<div className='row justify-content-center'>
				<div className='col-8'>
					<div className='row container justify-content-center'>
						<div className='col-8'>
							<form onSubmit={handleSubmit} className='CompanyList-search bg-light mt-3 p-3 rounded shadow-md d-flex align-items-center'>
								<input className='form-control mx-2' id='name' name='name' type='text' placeholder='Enter search term...' value={formData.name} onChange={handleChange} />
								<button className='btn btn-primary'>Submit</button>
							</form>
						</div>
					</div>
					{companies.map(c => (
						<Link to={`/companies/${c.handle}`} className='CompanyList-cardLink'>
							<CompanyCard key={c.handle} handle={c.handle} name={c.name} description={c.description} numEmployees={c.numEmployees} />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default CompanyList;
