import {
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Error from "~components/Error";
import PostCard from "~components/PostCard";
import { fetchPosts } from "~queries/post";
import { iPost } from "~types/post";

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery<iPost[], Error>(
    ["fetchPosts"],
    fetchPosts,
    {}
  );

  if (error) return <Error message={error.message} />;

  if (isLoading)
    return (
      <Center w="full" h="full">
        <Spinner size="lg" />
      </Center>
    );

  return (
    <>
      <Head>
        <title>bandet</title>
        <meta name="description" content="real bandet shiieeet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="1rem" p="1rem">
          {data &&
            data?.length > 0 &&
            data.map((postData) => (
              <PostCard key={postData.post.id} feedView data={postData} />
            ))}
        </SimpleGrid>
      </>
    </>
  );
};

export default Home;
