/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteLikeInWodInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteLikeInWod
// ====================================================

export interface deleteLikeInWod_deleteLikeInWod {
  __typename: "DeleteLikeInWodOutput";
  error: string | null;
  ok: boolean;
}

export interface deleteLikeInWod {
  deleteLikeInWod: deleteLikeInWod_deleteLikeInWod;
}

export interface deleteLikeInWodVariables {
  input: DeleteLikeInWodInput;
}
