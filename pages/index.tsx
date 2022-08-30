import { Center, Flex, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
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
      <Center w="full" h="full">
        <Flex
          alignItems={"center"}
          direction={{ base: "column", lg: "row" }}
          p="4"
          gap="2"
        >
          <>
            <Wrap justifyContent={"center"}>
              {data &&
                data?.length > 0 &&
                data.map((postData, i) => (
                  <WrapItem key={i} w={{ base: "full", md: "auto" }}>
                    <PostCard feedView data={postData} />
                  </WrapItem>
                ))}
            </Wrap>
          </>
        </Flex>
      </Center>
    </>
  );
};

export default Home;
