import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { iPost } from "../../types/post";
import PostCard from "../../components/PostCard";
import { server } from "../../utils/config";
import { Center, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../../queries/post";
import Error from "../../components/Error";

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const rest = await fetch(`${server}/api/post/${id}`);
  const data: iPost = await rest.json();

  if (!data) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: { data },
    };
  }
};

interface Props {
  data: iPost;
} */
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
  // return data && <PostCard data={data} />;
};

export default Post;
