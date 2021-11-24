/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterFreeTrialInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: registerFreeTrial
// ====================================================

export interface registerFreeTrial_registerFreeTrial {
  __typename: "RegisterFreeTrialOutput";
  error: string | null;
  ok: boolean;
  freeTrialId: number;
}

export interface registerFreeTrial {
  registerFreeTrial: registerFreeTrial_registerFreeTrial;
}

export interface registerFreeTrialVariables {
  input: RegisterFreeTrialInput;
}
