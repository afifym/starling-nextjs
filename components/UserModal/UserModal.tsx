import { Box, Heading, HStack, VStack } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Input,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuth } from '../../logic/useAuth/useAuth';
import { uploadImage } from '../../firebase/storage';

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserModal: React.FC<IProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { currentUser, addImage, addDisplayName } = useAuth();
  const [formData, setFormData] = useState({
    firstName: currentUser?.displayName?.split(' ')[0],
    lastName: currentUser?.displayName?.split(' ')[1],
  });

  const handleImageUpload = async (e) => {
    const [file] = e.target.files;
    const imgURL = await uploadImage(file);
    addImage(imgURL);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDisplayName(`${formData.firstName} ${formData.lastName}`);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
      <ModalContent maxWidth='700px'>
        <ModalHeader>
          <Heading>Settings</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <Box>
              <Image
                boxSize='200px'
                objectFit='cover'
                borderRadius='md'
                src={currentUser?.photoURL}
                alt={currentUser?.displayName}
              />
              <img src='' alt='' />
              <input
                type='file'
                id='image'
                style={{ margin: 8 }}
                placeholder='image'
                accept='image/jpg'
                onChange={handleImageUpload}
              />
            </Box>
            <form onSubmit={handleSubmit}>
              <VStack alignItems='flex-start' spacing={5}>
                <Input
                  placeholder='first name'
                  size='md'
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <Input
                  placeholder='last name'
                  size='md'
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                <Button type='submit'>Save</Button>
              </VStack>
            </form>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
