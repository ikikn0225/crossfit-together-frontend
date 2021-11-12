/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditBorInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editBor
// ====================================================

export interface editBor_editBor {
  __typename: "EditBorOutput";
  error: string | null;
  ok: boolean;
}

export interface editBor {
  editBor: editBor_editBor;
}

export interface editBorVariables {
  input: EditBorInput;
}
