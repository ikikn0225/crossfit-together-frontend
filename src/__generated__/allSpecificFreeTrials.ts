/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllSpecificFreeTrialsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allSpecificFreeTrials
// ====================================================

export interface allSpecificFreeTrials_allSpecificFreeTrials_freeTrials_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface allSpecificFreeTrials_allSpecificFreeTrials_freeTrials {
  __typename: "FreeTrial";
  id: number;
  freeTrialAt: any;
  owner: allSpecificFreeTrials_allSpecificFreeTrials_freeTrials_owner;
}

export interface allSpecificFreeTrials_allSpecificFreeTrials {
  __typename: "AllSpecificFreeTrialsOutput";
  error: string | null;
  ok: boolean;
  freeTrials: allSpecificFreeTrials_allSpecificFreeTrials_freeTrials[] | null;
}

export interface allSpecificFreeTrials {
  allSpecificFreeTrials: allSpecificFreeTrials_allSpecificFreeTrials;
}

export interface allSpecificFreeTrialsVariables {
  input: AllSpecificFreeTrialsInput;
}
