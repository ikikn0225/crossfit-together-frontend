/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllHoldsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allHolds
// ====================================================

export interface allHolds_allHolds_holds_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface allHolds_allHolds_holds {
  __typename: "Hold";
  id: number;
  holdAt: any;
  owner: allHolds_allHolds_holds_owner;
}

export interface allHolds_allHolds {
  __typename: "AllHoldsOutput";
  error: string | null;
  ok: boolean;
  holds: allHolds_allHolds_holds[] | null;
}

export interface allHolds {
  allHolds: allHolds_allHolds;
}

export interface allHoldsVariables {
  input: AllHoldsInput;
}
