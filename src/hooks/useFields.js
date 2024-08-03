import { useState } from "react";


// Custom hook to handle form data
const useFields = initialState => {
	const [formData, setFormData] = useState(initialState);

	// Update form data by key
	const handleChange = e => {
		const { value, name, type } = e.target;
		setFormData(formData => ({
			...formData,
			[name]: type === 'number' ? parseInt(value) : value,
		}));
	};

	return [formData, handleChange, setFormData];
};

export default useFields;
