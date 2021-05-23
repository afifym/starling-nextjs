import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { ITodo } from '../../../../config/interfaces';
import FormAccent from './components/FormAccent/FormAccent';
import FormPriority from './components/FormPriority/FormPriority';
import FormProgress from './components/FormProgress/FormProgress';
import FormRepeats from './components/FormRepeats/FormRepeats';
import FormTags from './components/FormTags/FormTags';
import FormTitle from './components/FormTitle/FormTitle';

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: ITodo;
}

const TodoModal: React.FC<IProps> = ({ isModalOpen, setIsModalOpen, todo }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent maxWidth='700px'>
        <ModalHeader>
          <FormTitle todo={todo} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection='column' w='400px' m='auto'>
            <FormAccent todo={todo} />
            <FormPriority todo={todo} />
            <FormTags todo={todo} />
            <FormProgress todo={todo} />
            <FormRepeats todo={todo} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TodoModal;
