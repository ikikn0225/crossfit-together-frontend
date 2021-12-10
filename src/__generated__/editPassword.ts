/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPasswordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editPassword
// ====================================================

export interface editPassword_editPassword {
  __typename: "EditPasswordOutput";
  ok: boolean;
  error: string | null;
}

export interface editPassword {
  editPassword: editPassword_editPassword;
}

export interface editPasswordVariables {
  input: EditPasswordInput;
}
