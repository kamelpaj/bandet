import type { NextApiRequest, NextApiResponse } from "next";
import { iPost } from "../../../types/post";
import { definitions } from "../../../types/supabase";
import { supabase } from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id) res.status(400);

  const post = await supabase
    .from<definitions["post"]>("post")
    .select("*, profiles (username, avatar_url)")
    .eq("id", id)
    .single();

  if (post.body?.file_id) {
    const file = supabase.storage
      .from("filer")
      .getPublicUrl(post.body?.file_id).data?.publicURL;

    if (file) res.status(200).json({ post: post.body, file });
  }

  if (!post) res.status(404);
}
