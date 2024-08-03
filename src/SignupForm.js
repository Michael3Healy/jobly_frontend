import useFields from './hooks/useFields';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SignupForm.css';

// Component for the signup form. The signup function is passed down from the parent component, which is the App component in this case.
const SignupForm = ({ signup }) => {
	const [formData, handleChange] = useFields({ username: '', password: '', firstName: '', lastName: '', email: '' });
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async e => {
		try {
			e.preventDefault();
			await signup(formData);
			navigate('/');
		} catch (err) {
			setError(err);
		}
	};

	if (error) return <div className='Error'>Error: {error}</div>;

	return (
		<div className='SignupForm container'>
			<div className='row justify-content-center mt-5'>
				<div className='col-6'>
					<form className='bg-light p-4 rounded shadow-md' onSubmit={handleSubmit}>
						<div className='mb-4'>
							<label htmlFor='username' className='form-label'>
								Username
							</label>
							<input type='text' id='username' name='username' className='form-control' onChange={handleChange} value={formData.username} required />
						</div>
						<div className='mb-4'>
							<label htmlFor='password' className='form-label'>
								Password
							</label>
							<input type='password' id='password' name='password' className='form-control' onChange={handleChange} value={formData.password} required />
						</div>
						<div className='mb-4'>
							<label htmlFor='firstName' className='form-label'>
								First Name
							</label>
							<input type='text' id='firstName' name='firstName' className='form-control' onChange={handleChange} value={formData.firstName} required />
						</div>
						<div className='mb-4'>
							<label htmlFor='lastName' className='form-label'>
								Last Name
							</label>
							<input type='text' id='lastName' name='lastName' className='form-control' onChange={handleChange} value={formData.lastName} required />
						</div>
						<div className='mb-4'>
							<label htmlFor='email' className='form-label'>
								Email
							</label>
							<input type='email' id='email' name='email' className='form-control' onChange={handleChange} value={formData.email} required />
						</div>
						<button type='submit' className='btn btn-primary btn-block'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignupForm;
