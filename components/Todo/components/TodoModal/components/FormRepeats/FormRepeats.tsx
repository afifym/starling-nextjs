import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box, HStack, Stack, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import React from 'react';
import { ITodo } from '../../../../../../config/interfaces';
import { useTodos } from '../../../../../../logic/useTodos/useTodos';
import FormWrapper from '../shared/FormWrapper';

interface IProps {
  todo: ITodo;
}

const FormRepeats: React.FC<IProps> = ({ todo }) => {
  const { changeRepeats } = useTodos();

  const handleChange = () => {
    console.log('change here..........');
    changeRepeats(todo.id, !todo.repeats);
  };

  return (
    <FormWrapper label='Repeats?'>
      <Switch
        size='md'
        id='repeats'
        defaultIsChecked={todo.repeats}
        onFocus={handleChange}
      />
    </FormWrapper>
  );
};

export default FormRepeats;
