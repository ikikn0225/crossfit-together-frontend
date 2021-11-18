/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterHoldInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: registerHold
// ====================================================

export interface registerHold_registerHold {
  __typename: "RegisterHoldOutput";
  error: string | null;
  ok: boolean;
}

export interface registerHold {
  registerHold: registerHold_registerHold;
}

export interface registerHoldVariables {
  input: RegisterHoldInput;
}
