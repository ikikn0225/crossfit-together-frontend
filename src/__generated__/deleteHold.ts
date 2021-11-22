/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteHoldInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteHold
// ====================================================

export interface deleteHold_deleteHold {
  __typename: "DeleteHoldOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteHold {
  deleteHold: deleteHold_deleteHold;
}

export interface deleteHoldVariables {
  input: DeleteHoldInput;
}
