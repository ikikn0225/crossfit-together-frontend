/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAffiliatedBoxInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAffiliatedBoxMutation
// ====================================================

export interface CreateAffiliatedBoxMutation_createAffiliatedBox {
  __typename: "CreateAffiliatedBoxOutput";
  ok: boolean;
  error: string | null;
  affiliatedBoxId: number;
}

export interface CreateAffiliatedBoxMutation {
  createAffiliatedBox: CreateAffiliatedBoxMutation_createAffiliatedBox;
}

export interface CreateAffiliatedBoxMutationVariables {
  createAffiliatedBoxInput: CreateAffiliatedBoxInput;
}
