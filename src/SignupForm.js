import useFields from "./hooks/useFields";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupForm = ({ signup }) => {
	const [formData, handleChange] = useFields({ username: '', password: '', firstName: '', lastName: '', email: '' });
	const [error, setError] = useState(null)
    const navigate = useNavigate();

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			await signup(formData);
			navigate('/')
		} catch (err) {
			setError(err);
		}
	}

	if (error) return <div className="Error">Error: {error}</div>;

	return (
		<form className="SignupForm" onSubmit={handleSubmit}>

			<label htmlFor='username'>Username: </label>
			<input type='text' id='username' name='username' onChange={handleChange} value={formData.username} />

			<label htmlFor='password'>Password: </label>
            <input type="text" id="password" name="password" onChange={handleChange} value={formData.password} />

			<label htmlFor="firstName">First Name: </label>
			<input type="text" id="firstName" name="firstName" onChange={handleChange} value={formData.firstName} />

			<label htmlFor="lastName">Last Name: </label>
			<input type="text" id="lastName" name="lastName" onChange={handleChange} value={formData.lastName} />

			<label htmlFor="email">Email: </label>
			<input type="text" id="email" name="email" onChange={handleChange} value={formData.email} />

			<button>Submit</button>
		</form>
	);
};

export default SignupForm;
