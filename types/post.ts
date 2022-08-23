import { definitions } from "./supabase";

export interface iPost {
  post: definitions["post"] & {
    profiles?: { username: string; avatar_url: string };
  };
  file: string;
}
