/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteWodInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteWod
// ====================================================

export interface deleteWod_deleteWod {
  __typename: "DeleteWodOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteWod {
  deleteWod: deleteWod_deleteWod;
}

export interface deleteWodVariables {
  deleteWodInput: DeleteWodInput;
}
