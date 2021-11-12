/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteBorInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteBor
// ====================================================

export interface deleteBor_deleteBor {
  __typename: "DeleteBorOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteBor {
  deleteBor: deleteBor_deleteBor;
}

export interface deleteBorVariables {
  input: DeleteBorInput;
}
