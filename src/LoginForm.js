import { useNavigate } from "react-router-dom";
import useFields from "./hooks/useFields";
import { useState } from "react";

const LoginForm = ({ login }) => {
    const [formData, handleChange] = useFields({ username: '', password: '' });
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await login(formData);
            navigate('/')
        } catch (err) {
            setError(err)
        }
    }

    if (error) return <div>Error: {error}</div>;

    return (
        <form className="LoginForm" onSubmit={handleSubmit}>
            <label htmlFor='username'>Username: </label>
            <input type="text" id="username" name='username' onChange={handleChange} value={formData.username}/>
            <label htmlFor='password'>Password: </label>
            <input type="text" id="password" name="password" onChange={handleChange} value={formData.password}/>
            <button>Submit</button>
        </form>
    )
}

export default LoginForm;