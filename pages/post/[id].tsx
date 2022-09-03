import { useRouter } from "next/router";
import { NextPage } from "next";
import { iPost } from "~types/post";
import PostCard from "~components/PostCard";
import {
  Avatar,
  Button,
  Center,
  useColorModeValue,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "~queries/post";
import Error from "~components/Error";
import { useState } from "react";
import { useAuthStore } from "~store/authStore";
import { supabase } from "~utils/supabase";
import moment from "moment";
import Head from "next/head";

const Post: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  const session = useAuthStore((state) => state.session);
  const toast = useToast();
  const [comment, setComment] = useState("");
  const [postCommentLoading, setPostCommentLoading] = useState(false);

  const textColor = useColorModeValue("gray.700", "gray.400");

  const { isLoading, error, data, refetch } = useQuery<iPost, Error>(
    ["fetchPost"],
    () => fetchPost(id as string),
    { enabled: id !== undefined }
  );

  const handlePostComment = async () => {
    setPostCommentLoading(true);
    const { data, error } = await supabase.from("comment").insert({
      created_by: session?.user?.id,
      post_id: Number(id),
      text: comment,
    });

    if (data) {
      toast({
        title: "Comment posted!",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
      setComment("");
    }

    if (error) {
      toast({
        title: "Something went wrong 😢",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setPostCommentLoading(false);
  };

  if (isLoading)
    return (
      <Center pt="4">
        <Spinner />{" "}
      </Center>
    );
  if (error) return <Error message={error.message} />;
  return (
    <>
      {data && (
        <>
          <Head>
            <title>
              bandet {" •"} {data.post.title}
            </title>
            <meta
              property="og:title"
              content={`bandet • ${data.post.title}`}
              key="title"
            />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={data.post.description} />
          </Head>
          <Center pt="4">
            <VStack>
              <PostCard feedView={false} data={data} />
              {session && (
                <HStack w="full" py="4">
                  <Avatar size={{ base: "sm", md: "md" }} />
                  <Input
                    value={comment}
                    type="text"
                    placeholder="New comment..."
                    variant="filled"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    onClick={handlePostComment}
                    disabled={comment.length < 1 || postCommentLoading}
                    isLoading={postCommentLoading}
                  >
                    {postCommentLoading ? <Spinner /> : "Send"}
                  </Button>
                </HStack>
              )}
              <VStack spacing={4} w="100%" pt="6">
                {data.post.comment?.length &&
                  data?.post?.comment.map((c) => (
                    <Stack
                      mt={2}
                      direction={"row"}
                      spacing={4}
                      key={c.id}
                      w="full"
                    >
                      <Avatar src={c.profiles.avatar_url} />
                      <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        <Text fontWeight={600}>
                          {c.profiles.username}
                          <Text as="span" color={"gray.500"}>
                            {" •"} {moment(c.created_at).fromNow()}
                          </Text>
                        </Text>
                        <Text color={textColor}> {c.text} </Text>
                      </Stack>
                    </Stack>
                  ))}
              </VStack>
            </VStack>
          </Center>
        </>
      )}
    </>
  );
};

export default Post;
