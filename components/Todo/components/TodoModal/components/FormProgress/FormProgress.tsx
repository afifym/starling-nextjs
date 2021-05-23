import {
  FormControl,
  Stack,
  FormLabel,
  Slider,
  SliderTrack,
  Box,
  SliderFilledTrack,
  SliderThumb,
  Text,
  HStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ITodo } from '../../../../../../config/interfaces';
import { useTodos } from '../../../../../../logic/useTodos/useTodos';
import FormWrapper from '../shared/FormWrapper';
import LabelWrapper from '../shared/LabelWrapper';

interface IProps {
  todo: ITodo;
}

const FormProgress: React.FC<IProps> = ({ todo }) => {
  const { changeProgress } = useTodos();

  const handleChange = (val) => {
    changeProgress(todo.id, val);
  };
  return (
    <FormWrapper label='progress'>
      <HStack w='300px'>
        <Slider
          onChangeEnd={handleChange}
          defaultValue={todo.progress.current}
          min={0}
          max={100}
          step={10}
        >
          <SliderTrack bg='red.100'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='green.400' />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <Text>{todo.progress.current}%</Text>
      </HStack>
    </FormWrapper>
  );
};

export default FormProgress;
