/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllLikesInWodInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allLikesInWod
// ====================================================

export interface allLikesInWod_allLikesInWod_likes_owner {
  __typename: "User";
  id: number;
}

export interface allLikesInWod_allLikesInWod_likes {
  __typename: "Like";
  owner: allLikesInWod_allLikesInWod_likes_owner;
}

export interface allLikesInWod_allLikesInWod {
  __typename: "AllLikesInWodOutput";
  ok: boolean;
  error: string | null;
  likes: allLikesInWod_allLikesInWod_likes[] | null;
}

export interface allLikesInWod {
  allLikesInWod: allLikesInWod_allLikesInWod;
}

export interface allLikesInWodVariables {
  input: AllLikesInWodInput;
}
