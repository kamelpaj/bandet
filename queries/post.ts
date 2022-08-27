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

export async function fetchPost(id: string | number) {
  if (!id) return;

  return await fetch(`/api/post/${id}`)
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

export async function postComment(postId: string | number, comment: string) {
  return await fetch(`/api/comment`, {
    method: "POST",
    body: JSON.stringify({ postId, comment }),
  })
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
