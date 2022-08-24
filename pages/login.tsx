import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const session = supabase.auth.session();

  if (session) router.push("/");

  const handleLogin = () => {
    setLoading(true);
    supabase.auth
      .signIn({ email })
      .then(() => {
        toast({
          title: "We sent you a login link!",
          description: "Check your email 😊",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Something went wrong",
          description: "😢",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex minH={"100%"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Sign in with your email
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a login link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            // bg={"gray.400"}
            color={"white"}
            /* _hover={{
              bg: "gray.500",
            }} */
            disabled={loading}
            isLoading={loading}
            loadingText="Sending email link..."
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

/* export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Get our logged user
  const { user } = await supabase.auth.api.getUserByCookie(req);
  // Check if the user is logged
  if (user) {
    // Redirect if no logged in
    return { props: {}, redirect: { destination: "/" } };
  }

  return { props: {} };
}; */
