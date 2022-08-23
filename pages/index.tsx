import { Center, Flex, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Error from "../components/Error";
import Post from "../components/Post";
import { fetchPosts } from "../queries/post";
import { iPost } from "../types/post";

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery<iPost[], Error>(
    ["fetchPosts"],
    fetchPosts,
    {}
  );

  return (
    <>
      <Head>
        <title>bandet</title>
        <meta name="description" content="real bandet shiieeet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        alignItems={"center"}
        direction={{ base: "column", lg: "row" }}
        p="2"
        gap="2"
      >
        <>
          {isLoading && (
            <Center w="full" h="full">
              <Spinner size="lg" />
            </Center>
          )}
          {error && <Error message={error.message} />}
          <Wrap>
            {data &&
              data?.length > 0 &&
              data.map((post, i) => (
                <WrapItem key={i} w={{ base: "full", md: "auto" }}>
                  <Post data={post} />
                </WrapItem>
              ))}
          </Wrap>
        </>
      </Flex>
    </>
  );
};

export default Home;
