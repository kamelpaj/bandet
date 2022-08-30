import { definitions } from "~types/supabase";

export interface iPost {
  post: definitions["post"] & {
    profiles?: definitions["profiles"];
    comment?: [definitions["comment"] & { profiles: definitions["profiles"] }];
  };
  file: string;
}
