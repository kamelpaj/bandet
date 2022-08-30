import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  useToast,
  Heading,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { supabase } from "~utils/supabase";
import Link from "next/link";
import { HiOutlineUpload, HiOutlineMicrophone } from "react-icons/hi";
import { useAuthStore } from "~store/authStore";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  const session = useAuthStore((state) => state.session);

  const handleSignOut = () => {
    supabase.auth.signOut().then(() => {
      router.push("/login");
      toast({
        title: "You signed out",
        description: "You're welcome back any time 😊",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.200", "gray.900")} px={4} as="header">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link href="/">
            <Heading _hover={{ cursor: "pointer" }}>bandet</Heading>
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={6}>
              {session && (
                <>
                  {/* <Link href="/record">
                    <a>
                      <Tooltip label="Record" hasArrow>
                        <IconButton
                          aria-label="Record"
                          icon={<HiOutlineMicrophone />}
                          size="lg"
                        />
                      </Tooltip>
                    </a>
                  </Link> */}
                  <Link href="/upload">
                    <a>
                      <Tooltip label="Upload" hasArrow>
                        <IconButton
                          aria-label="Upload"
                          icon={<HiOutlineUpload />}
                          size="lg"
                        />
                      </Tooltip>
                    </a>
                  </Link>
                </>
              )}

              <Tooltip label="Toggle color mode" hasArrow>
                <IconButton
                  aria-label="Toggle color mode"
                  icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  size="lg"
                  onClick={toggleColorMode}
                />
              </Tooltip>

              {!session && (
                <Link href="/login">
                  <a>
                    <Button colorScheme="blue" size="lg">
                      Log in
                    </Button>
                  </a>
                </Link>
              )}

              {session && (
                <Flex>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p> {session?.user?.email} </p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <Link href="/profile">
                        <MenuItem>Your profile</MenuItem>
                      </Link>
                      <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
