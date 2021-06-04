import {
  Slider,
  SliderTrack,
  Box,
  SliderFilledTrack,
  SliderThumb,
  Text,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { ITodo } from '../../../../../../config/interfaces';
import { useTodos } from '../../../../../../logic/useTodos/useTodos';
import FormWrapper from '../shared/FormWrapper';

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
      <HStack w='260px'>
        <Slider
          onChangeEnd={handleChange}
          defaultValue={todo.progress.current}
          min={0}
          max={6}
          step={1}
        >
          <SliderTrack bg='red.100'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='green.400' />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <Text textAlign='right' fontSize='1.4rem' w='60px'>
          {todo.progress.current}
          <span style={{ fontSize: '0.8rem' }}> / 6</span>
        </Text>
      </HStack>
    </FormWrapper>
  );
};

export default FormProgress;
