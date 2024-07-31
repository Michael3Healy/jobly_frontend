import { useState } from "react";

const useFields = initialState => {
	const [formData, setFormData] = useState(initialState);

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
