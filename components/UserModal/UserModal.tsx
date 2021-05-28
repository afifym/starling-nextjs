import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
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
  FormControl,
  FormLabel,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuth } from '../../logic/useAuth/useAuth';
import { uploadImage } from '../../firebase/storage';
import { usePhases } from '../../logic/usePhases/usePhases';

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserModal: React.FC<IProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { currentUser, addImage, addDisplayName } = useAuth();
  const { changePhaseType, isFollowPrayers } = usePhases();

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

                <HStack>
                  <Text opacity='0.5' fontSize='0.8rem'>
                    Day Start
                  </Text>
                  <Text>7:00 am</Text>
                </HStack>

                <HStack>
                  <Text opacity='0.5' fontSize='0.8rem'>
                    Day End
                  </Text>
                  <Text>12:00 am</Text>
                </HStack>

                <FormControl display='flex' alignItems='center'>
                  <FormLabel htmlFor='prayer-times' mb='0'>
                    <Tooltip
                      label='Split the day into phases around prayers, for example, the first phase would start from day start and end at dhuhr prayer, the last phase would start from Isha prayer and end and day end'
                      aria-label='A tooltip'
                    >
                      Follow Prayer Times?
                    </Tooltip>
                  </FormLabel>
                  <Switch
                    id='prayer-times'
                    size='md'
                    defaultIsChecked={isFollowPrayers}
                    onFocus={() => changePhaseType(!isFollowPrayers)}
                  />
                </FormControl>

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
