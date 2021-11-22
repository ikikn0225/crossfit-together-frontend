/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllSpecificHoldsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allSpecificHolds
// ====================================================

export interface allSpecificHolds_allSpecificHolds_holds_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface allSpecificHolds_allSpecificHolds_holds {
  __typename: "Hold";
  id: number;
  holdAt: any;
  owner: allSpecificHolds_allSpecificHolds_holds_owner;
}

export interface allSpecificHolds_allSpecificHolds {
  __typename: "AllSpecificHoldsOutput";
  error: string | null;
  ok: boolean;
  holds: allSpecificHolds_allSpecificHolds_holds[] | null;
}

export interface allSpecificHolds {
  allSpecificHolds: allSpecificHolds_allSpecificHolds;
}

export interface allSpecificHoldsVariables {
  input: AllSpecificHoldsInput;
}
