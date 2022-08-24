import {
  Stack,
  Heading,
  useColorModeValue,
  Tag,
  Text,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { iPost } from "../../types/post";

interface Props {
  data: iPost;
}

const PostCard: React.FC<Props> = ({ data }) => {
  const { post, file } = data;

  return (
    <Stack
      borderRadius="lg"
      w={{ base: "100%", md: "540px" }}
      maxW={{ base: "100vw", md: "540px" }}
      minH="20rem"
      bg={useColorModeValue("white", "gray.800")}
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      padding={8}
    >
      <Stack flex={1} flexDirection="column">
        <Flex w="full" alignItems={"center"} gap="3">
          <Avatar
            src={
              post?.profiles?.avatar_url
                ? post?.profiles?.avatar_url
                : "https://avatars.dicebear.com/api/male/username.svg"
            }
          />
          <Text fontWeight={"600"}>
            {post?.profiles?.username
              ? post?.profiles?.username
              : "[no username]"}
          </Text>
        </Flex>

        <Stack _hover={{ cursor: "pointer" }}>
          <Link href={`/post/${post.id}`}>
            <a>
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                {post.title}
              </Heading>

              <Text color={useColorModeValue("gray.700", "gray.400")}>
                {post.description}
              </Text>
              <Stack direction={"row"}>
                {post.tags &&
                  post.tags.map((t, i) => (
                    <Tag key={i} size="lg" textOverflow="ellipsis">
                      {t as string}
                    </Tag>
                  ))}
              </Stack>
            </a>
          </Link>
        </Stack>

        <audio controls style={{ width: "100%", marginTop: "1rem" }}>
          <source src={file} />
          Your browser does not support the audio element.
        </audio>
      </Stack>
    </Stack>
  );
};

export default PostCard;