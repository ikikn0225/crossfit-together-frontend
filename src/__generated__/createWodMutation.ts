/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateWodInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createWodMutation
// ====================================================

export interface createWodMutation_createWod {
  __typename: "CreateWodOutput";
  ok: boolean;
  error: string | null;
}

export interface createWodMutation {
  createWod: createWodMutation_createWod;
}

export interface createWodMutationVariables {
  createWodInput: CreateWodInput;
}
