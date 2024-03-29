import React from 'react';
import { Box, Circle, VStack } from '@chakra-ui/layout';
import { useRadio, HStack, useRadioGroup } from '@chakra-ui/react';
import { ITodo, TPriority } from '../../../../../../config/interfaces';
import { useTodos } from '../../../../../../logic/useTodos/useTodos';
import FormWrapper from '../shared/FormWrapper';

interface IProps {
  todo: ITodo;
}

const FormPriority: React.FC<IProps> = ({ todo }) => {
  const { changePriority } = useTodos();

  const handleChange = (val: TPriority) => {
    changePriority(todo.id, val);
  };

  const options: TPriority[] = ['1', '2', '3', '0'];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'priority',
    defaultValue: todo.priority,
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <FormWrapper label='Priority' {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <PriorityRadio key={value} {...radio}>
            {value}
          </PriorityRadio>
        );
      })}
    </FormWrapper>
  );
};

export default FormPriority;

const PriorityRadio = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const p = props.children;

  return (
    <Box as='label'>
      <input {...input} />
      <VStack
        {...checkbox}
        cursor='pointer'
        h='30px'
        minWidth='30px'
        borderWidth='2px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          color: 'white',
          borderColor: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={2}
      >
        <HStack h='100%' px={1} alignItems='center'>
          {[...Array(parseInt(p)).keys()].map((_, i) => (
            <Circle
              as='span'
              size='12px'
              bg='teal.400'
              borderColor='teal.800'
              borderWidth='3.5px'
              key={i}
            />
          ))}
        </HStack>
        {/* <Text fontSize='0.7rem'>
          {p === '1'
            ? 'Low'
            : p === '2'
            ? 'Medium'
            : p === '3'
            ? 'High'
            : 'None'}
        </Text> */}
      </VStack>
    </Box>
  );
};
