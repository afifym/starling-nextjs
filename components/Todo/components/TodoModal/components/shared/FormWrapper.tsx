import { HStack, Text } from '@chakra-ui/layout';
import React from 'react';

interface IProps {
  label: string;
}

const FormWrapper: React.FC<IProps> = ({ children, label, ...props }) => {
  return (
    <HStack my={5} {...props}>
      <Text
        minWidth='80px'
        textTransform='lowercase'
        color='whiteAlpha.800'
        align='right'
      >
        {label}
      </Text>
      <HStack pl={4} maxHeight='50px'>
        {children}
      </HStack>
    </HStack>
  );
};

export default FormWrapper;
