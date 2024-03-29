import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Center, Heading, VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAuth } from "../logic/useAuth/useAuth";
import { useRouter } from "next/router";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";
import Link from "next/link";

const Signup = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(false);
      await signup(formData.email, formData.password);
      router.push("/");
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Center w="100vw" h="100vh">
      <VStack
        minWidth="300px"
        maxWidth="400px"
        w="50%"
        h="80%"
        justifyContent="center"
        borderRadius="lg"
        bg="grey.900"
        boxShadow="dark-lg"
        py={6}
      >
        <Link href="/">
          <a style={{ width: "150px" }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/starling-b131b.appspot.com/o/logo-starling.svg?alt=media&token=aabdb7b2-f735-4e69-92b2-c0404f1cc2d6"
              alt="starling"
            />
          </a>
        </Link>
        <Heading py={2}>Signup</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdEmail color="gray.300" />}
              />
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder="email"
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<RiLockPasswordFill color="gray.300" />}
              />
              <Input
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder="password"
              />
            </InputGroup>
            <Box py={5}>
              <Button isLoading={loading} type="submit" size="lg" bg="teal.400">
                Signup
              </Button>
            </Box>
          </VStack>
        </form>

        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>An error occurred</AlertTitle>
            <CloseButton
              onClick={() => setError(false)}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>
        )}
      </VStack>
    </Center>
  );
};

export default Signup;
