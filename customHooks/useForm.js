import React, { useState } from 'react';

const numberInputs = ['accent'];

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleFormChange = (e) => {
    console.log('FORM DATA: ', formData);

    if (numberInputs.includes(e.target.name)) {
      setFormData((state) => ({
        ...state,
        [e.target.name]: parseInt(e.target.value),
      }));
    } else {
      setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
  };

  return [formData, handleFormChange];
};

export default useForm;
