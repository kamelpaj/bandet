import type { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "../../types/supabase";
import { supabase } from "../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  const postData = await supabase
    .from<definitions["post"]>("post")
    .select("*, profiles (username, avatar_url), comment (text)");

  const posts = postData.data?.map((post) => {
    if (post.file_id) {
      const file = supabase.storage.from("filer").getPublicUrl(post.file_id)
        .data?.publicURL;

      return {
        post,
        file,
      };
    }
  });

  res.status(200).json(posts);
}
