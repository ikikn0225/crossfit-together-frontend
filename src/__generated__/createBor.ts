/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBorInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createBor
// ====================================================

export interface createBor_createBor {
  __typename: "CreateBorOutput";
  ok: boolean;
  error: string | null;
  borId: number;
}

export interface createBor {
  createBor: createBor_createBor;
}

export interface createBorVariables {
  input: CreateBorInput;
}
