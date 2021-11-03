/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateLikeInWodInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createLikeInWod
// ====================================================

export interface createLikeInWod_createLikeInWod {
  __typename: "CreateLikeInWodOutput";
  error: string | null;
  ok: boolean;
}

export interface createLikeInWod {
  createLikeInWod: createLikeInWod_createLikeInWod;
}

export interface createLikeInWodVariables {
  input: CreateLikeInWodInput;
}
