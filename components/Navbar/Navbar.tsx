import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import { Box, HStack, Stack } from '@chakra-ui/layout';
import NextTodo from '../DayProgress/NextTodo/NextTodo';
import { useTodos } from '../../logic/useTodos/useTodos';
import { useAuth } from '../../logic/useAuth/useAuth';

const Navbar: React.FC = () => {
  const { phase } = useTodos();
  const { currentUser, logout } = useAuth();

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justifyContent='space-between'
      alignItems={{ base: 'normal', lg: 'center' }}
      mt={4}
      mx={4}
      mb={5}
      position='relative'
    >
      <Box w={{ base: '100px', lg: '200px' }}>
        <Link href='/'>
          <a style={{ width: '100px' }}>
            <Image
              src='/logo.svg'
              alt='starling'
              width={120}
              height={70}
              objectFit={'contain'}
            />
          </a>
        </Link>
      </Box>
      <Box w={{ base: '100%', lg: 'auto' }}>
        <NextTodo phase={phase} />
      </Box>

      <HStack
        spacing={4}
        mr={4}
        w={{ base: '100px', lg: '200px' }}
        position={{ base: 'absolute', lg: 'static' }}
        right={{ base: '100px' }}
        top={{ base: '0' }}
      >
        {currentUser?.uid ? (
          <Button onClick={logout} variant='ghost'>
            Logout
          </Button>
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
