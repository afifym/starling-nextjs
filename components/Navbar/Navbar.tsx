import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import { Box, HStack, Stack } from '@chakra-ui/layout';
import NextTodo from '../DayProgress/NextTodo/NextTodo';
import { useAuth } from '../../logic/useAuth/useAuth';
import { Avatar, AvatarBadge } from '@chakra-ui/avatar';
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
import UserModal from '../UserModal/UserModal';

import { BiLogOut } from 'react-icons/bi';
import { usePhases } from '../../logic/usePhases/usePhases';

const Navbar: React.FC = () => {
  const { currentPhase } = usePhases();
  const { currentUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justifyContent='space-between'
      alignItems={{ base: 'normal', lg: 'center' }}
      m='auto'
      mt={9}
      mb='80px'
      w='96%'
      position='relative'
    >
      <Box w={{ base: '100px', lg: '200px' }}>
        <Link href='/'>
          <a style={{ width: '100px' }}>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/starling-b131b.appspot.com/o/logo-starling.svg?alt=media&token=aabdb7b2-f735-4e69-92b2-c0404f1cc2d6'
              alt='starling'
              width={120}
              height={70}
              objectFit='contain'
            />
          </a>
        </Link>
      </Box>
      <Box
        position='absolute'
        top='50%'
        left='50%'
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <NextTodo phase={currentPhase} />
      </Box>

      <HStack
        spacing={4}
        mr={4}
        w={{ base: '100px', lg: '200px' }}
        // position={{ base: 'absolute', lg: 'static' }}
        // right={{ base: '100px' }}
        // top={{ base: '0' }}
      >
        {currentUser?.uid ? (
          <HStack ml='auto' mr={6}>
            <UserModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <Menu>
              <MenuButton
                _focus={{ boxShadow: 'none' }}
                variant='ghost'
                borderRadius='full'
                as={IconButton}
                aria-label='Options'
                icon={
                  <Avatar size='md'>
                    {currentUser.photoURL && (
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                        }}
                        src={currentUser.photoURL}
                        alt=''
                      />
                    )}
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                  </Avatar>
                }
              />
              <MenuList>
                <MenuItem
                  onClick={() => setIsModalOpen(true)}
                  icon={<MdSettings size={20} />}
                >
                  Settings
                </MenuItem>
                <MenuItem onClick={logout} icon={<BiLogOut size={20} />}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <>
            <Link href='/login'>
              <a>
                <Button variant='ghost'>Login</Button>
              </a>
            </Link>
            <Link href='/signup'>
              <a>
                <Button variant='ghost' colorScheme='teal'>
                  Signup
                </Button>
              </a>
            </Link>
          </>
        )}
      </HStack>
    </Stack>
  );
};

export default Navbar;
