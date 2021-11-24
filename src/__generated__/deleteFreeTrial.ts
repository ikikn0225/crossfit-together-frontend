/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteFreeTrialInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteFreeTrial
// ====================================================

export interface deleteFreeTrial_deleteFreeTrial {
  __typename: "DeleteFreeTrialOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteFreeTrial {
  deleteFreeTrial: deleteFreeTrial_deleteFreeTrial;
}

export interface deleteFreeTrialVariables {
  input: DeleteFreeTrialInput;
}
