import React from 'react';
import { Box, useRadio, useRadioGroup } from '@chakra-ui/react';
import { ITodo } from '../../../../../../config/interfaces';
import { useTodos } from '../../../../../../logic/useTodos/useTodos';
import FormWrapper from '../shared/FormWrapper';
import { colors } from '../../../../../../config/data/mock';

interface IProps {
  todo: ITodo;
}

const FormAccent: React.FC<IProps> = ({ todo }) => {
  const { changeAccent } = useTodos();

  const handleChange = (val) => {
    changeAccent(todo.id, val);
  };

  const options = ['0', '1', '2', '3', '4', '5'];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'accent',
    defaultValue: todo.accent,
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <FormWrapper label='Accent' {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <ColorRadio key={value} {...radio}>
            {value}
          </ColorRadio>
        );
      })}
    </FormWrapper>
  );
};

export default FormAccent;

const ColorRadio = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      {props.children ? (
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='3px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            color: 'white',
            borderColor: 'white',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={4}
          py={3}
          bg={`${colors[props.children]}.600`}
        />
      ) : (
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='4px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            color: 'white',
            borderColor: 'white',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
          bg={`gray.600`}
        />
      )}
    </Box>
  );
};
