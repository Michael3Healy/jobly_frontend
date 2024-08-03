import { useContext } from 'react';
import UserContext from './userContext';
import useFields from './hooks/useFields';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import JoblyApi from './api';

const Profile = () => {
	const { currUser, setCurrUser } = useContext(UserContext);
	const [formData, handleChange] = useFields({firstName: currUser.firstName, lastName: currUser.lastName, email: currUser.email});

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			await JoblyApi.updateUser(currUser.username, formData);
			setCurrUser({ ...currUser, ...formData });
			navigate('/');
		} catch (err) {
			console.error('Error updating user: ', err);
		}
	};

	return (
		<div className='Profile container'>
			<div className='row justify-content-center'>
				<div className='col-6 mt-5'>
					<form className='bg-light p-4 rounded shadow-md' onSubmit={handleSubmit}>
						<div className='input-group d-flex align-items-center mb-4'>
							<label className='form-label mx-3' htmlFor='username'>Username: </label>
							<input className='form-control' type='text' id='username' name='username' value={currUser.username} disabled />
						</div>

						<div className='input-group d-flex align-items-center mb-4'>
							<label className='form-label mx-3' htmlFor='firstName'>First Name: </label>
							<input className='form-control' type='text' id='firstName' name='firstName' onChange={handleChange} value={formData.firstName} />
						</div>

						<div className='input-group d-flex align-items-center mb-4'>
							<label className='form-label mx-3' htmlFor='lastName'>Last Name: </label>
							<input className='form-control' type='text' id='lastName' name='lastName' onChange={handleChange} value={formData.lastName} />
						</div>

						<div className='input-group d-flex align-items-center mb-4'>
							<label className='form-label mx-3' htmlFor='email'>Email: </label>
							<input className='form-control' type='text' id='email' name='email' onChange={handleChange} value={formData.email} />
						</div>
						<button className='btn btn-success'>Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
