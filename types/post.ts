import { definitions } from "./supabase";

export interface iPost {
  post: definitions["post"] & {
    profiles?: definitions["profiles"];
    comment?: [definitions["comment"] & { profiles: definitions["profiles"] }];
  };
  file: string;
}
