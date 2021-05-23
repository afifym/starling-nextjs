import { useState } from 'react';
import { IUpdates } from '../../config/interfaces';

const numberInputs = ['accent'];

const useForm = (initialState: IUpdates) => {
  const [formData, setFormData] = useState<IUpdates>(initialState);

  const handleFormChange = ({ target }) => {
    if (numberInputs.includes(target.name)) {
      setFormData((state) => ({
        ...state,
        [target.name]: parseInt(target.value),
      }));
    } else {
      setFormData((state) => ({ ...state, [target.name]: target.value }));
    }
  };

  return { formData, handleFormChange };
};

export default useForm;
