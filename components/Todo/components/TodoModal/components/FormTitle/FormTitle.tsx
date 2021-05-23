import {
  useEditableControls,
  IconButton,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { ITodo } from '../../../../../../config/interfaces';
import { useTodos } from '../../../../../../logic/useTodos/useTodos';
import { RiEdit2Fill } from 'react-icons/ri';

interface IProps {
  todo: ITodo;
}

const FormTitle: React.FC<IProps> = ({ todo }) => {
  const { changeTitle } = useTodos();

  const handleChange = (val) => {
    changeTitle(todo.id, val);
  };

  const EditableControls = () => {
    const { isEditing, getEditButtonProps } = useEditableControls();

    return (
      !isEditing && (
        <Flex>
          <IconButton
            size='sm'
            icon={<RiEdit2Fill />}
            aria-label='edit'
            {...getEditButtonProps()}
          />
        </Flex>
      )
    );
  };

  return (
    <Editable
      textAlign='center'
      defaultValue={todo.title}
      onSubmit={handleChange}
      submitOnBlur
      fontSize='2xl'
      isPreviewFocusable={false}
    >
      <Stack direction='row' align='center'>
        <EditablePreview />
        <EditableInput />
        <EditableControls />
      </Stack>
    </Editable>
  );
};

export default FormTitle;
