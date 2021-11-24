/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyFreeTrialInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myFreeTrial
// ====================================================

export interface myFreeTrial_myFreeTrial_freeTrial {
  __typename: "FreeTrial";
  id: number;
  freeTrialAt: any;
}

export interface myFreeTrial_myFreeTrial {
  __typename: "MyFreeTrialOutput";
  error: string | null;
  ok: boolean;
  freeTrial: myFreeTrial_myFreeTrial_freeTrial;
}

export interface myFreeTrial {
  myFreeTrial: myFreeTrial_myFreeTrial;
}

export interface myFreeTrialVariables {
  input: MyFreeTrialInput;
}
