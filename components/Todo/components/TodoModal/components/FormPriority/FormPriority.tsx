import React from 'react';
import { Box, Circle, Text, VStack } from '@chakra-ui/layout';
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
        align='center'
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
        px={3}
      >
        <HStack my={1} h='15px'>
          {[...Array(parseInt(p)).keys()].map((_, i) => (
            <Circle
              as='span'
              size='12px'
              bg='teal.500'
              borderColor='teal.800'
              // bg={
              //   p === '1'
              //     ? '#378d74'
              //     : p === '2'
              //     ? '#d3bb37'
              //     : p === '3'
              //     ? '#ca5359'
              //     : 'grey.100'
              // }
              // borderColor={
              //   p === '1'
              //     ? '#225748'
              //     : p === '2'
              //     ? '#594636'
              //     : p === '3'
              //     ? '#5b303d'
              //     : 'grey.100'
              // }
              borderWidth='3.5px'
              key={i}
            />
          ))}
        </HStack>
        <Text fontSize='smaller' mt={0}>
          {p === '1'
            ? 'Low'
            : p === '2'
            ? 'Medium'
            : p === '3'
            ? 'High'
            : 'None'}
        </Text>
      </VStack>
    </Box>
  );
};
