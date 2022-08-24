import { useRouter } from "next/router";
import { NextPage } from "next";
import { iPost } from "../../types/post";
import PostCard from "@components/PostCard";
import { Center, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@queries/post";
import Error from "@components/Error";


const Post: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery<iPost, Error>(
    ["fetchPost"],
    () => fetchPost(id as string),
    { enabled: id !== undefined }
  );

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <>{data && <Center pt="2"> <PostCard data={data} /></Center>}</>;
};

export default Post;
