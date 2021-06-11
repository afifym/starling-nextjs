import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { Box, HStack } from "@chakra-ui/layout";
import NextTodo from "../DayProgress/NextTodo/NextTodo";
import { useAuth } from "../../logic/useAuth/useAuth";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import UserModal from "../UserModal/UserModal";
import { BiLogOut } from "react-icons/bi";
import { usePhases } from "../../logic/usePhases/usePhases";

const Navbar: React.FC = () => {
  const { currentPhase } = usePhases();
  const { currentUser, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HStack
      justifyContent="space-between"
      alignItems={{ base: "flex-start", lg: "center" }}
      m="auto"
      mt={{ base: 3, lg: 10 }}
      mb={{ base: "10em", lg: "5em" }}
      w={{ base: "85%", lg: "96%" }}
      position="relative"
      bg="gray.800"
    >
      <Box w={{ base: "90px", lg: "120px" }} position="relative" zIndex={10}>
        <Link href="/">
          <a style={{ width: "100%" }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/starling-b131b.appspot.com/o/logo-starling.svg?alt=media&token=aabdb7b2-f735-4e69-92b2-c0404f1cc2d6"
              alt="starling"
            />
          </a>
        </Link>
      </Box>

      <NextTodo phase={currentPhase} />

      <HStack spacing={4}>
        {currentUser?.uid ? (
          <HStack w="100%" justifyContent="flex-end">
            <UserModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <Menu>
              <MenuButton
                _focus={{ boxShadow: "none" }}
                variant="ghost"
                borderRadius="full"
                as={IconButton}
                aria-label="Options"
                icon={
                  <Avatar
                    size="md"
                    w={{ base: "40px", lg: "60px" }}
                    h={{ base: "40px", lg: "60px" }}
                  >
                    {currentUser.photoURL && (
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        src={currentUser.photoURL}
                        alt=""
                      />
                    )}
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
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
            <Link href="/login">
              <a>
                <Button variant="ghost">Login</Button>
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <Button variant="solid" color="white" colorScheme="teal">
                  Signup
                </Button>
              </a>
            </Link>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
