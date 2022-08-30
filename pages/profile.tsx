import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "~utils/supabase";
import { useEffect, useState } from "react";
import { useAuthStore } from "~store/authStore";
import { definitions } from "~types/supabase";

export default function Profile(): JSX.Element {
  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.session?.user);
  const toast = useToast();

  async function getUsername() {
    if (user) {
      const { data } = await supabase
        .from<definitions["profiles"]>("profiles")
        .select("username")
        .eq("id", user.id)
        .single();
      if (data?.username) setCurrentUsername(data.username);
    }
  }

  useEffect(() => {
    getUsername();
  }, [user]);

  async function updateProfile() {
    try {
      setLoading(true);

      const updates = {
        id: user?.id,
        username: newUsername,
        updated_at: new Date(),
      };

      const { data, error } = await supabase.from("profiles").upsert(updates);

      if (data) {
        toast({
          title: "Profile updated!",
          description: "Beautiful 😊",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        getUsername();
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        title: "Something went wrong...",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white.100", "gray.700")}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Hello, {currentUsername}!
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                size="xl"
                src="https://avatars.dicebear.com/api/male/username.svg"
              >
                {/* <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                /> */}
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" disabled>
                Change Icon
              </Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder={currentUsername}
            _placeholder={{ color: "gray.500" }}
            type="text"
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </FormControl>

        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="green"
            color={"white"}
            w="full"
            onClick={updateProfile}
            disabled={loading || !newUsername}
            isLoading={loading}
            loadingText="Updating..."
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
