/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditWodInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editWodMutation
// ====================================================

export interface editWodMutation_editWod {
  __typename: "EditWodOutput";
  ok: boolean;
  error: string | null;
}

export interface editWodMutation {
  editWod: editWodMutation_editWod;
}

export interface editWodMutationVariables {
  editWodInput: EditWodInput;
}
