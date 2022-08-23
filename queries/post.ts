import { iPost } from "../types/post";

export async function fetchPosts() {
  return await fetch("/api/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Failed to fetch posts...");
    });
}
