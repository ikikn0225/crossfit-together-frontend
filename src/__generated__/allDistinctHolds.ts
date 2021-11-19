/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allDistinctHolds
// ====================================================

export interface allDistinctHolds_allDistinctHolds_holds_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface allDistinctHolds_allDistinctHolds_holds {
  __typename: "Hold";
  id: number;
  holdAt: any;
  owner: allDistinctHolds_allDistinctHolds_holds_owner;
}

export interface allDistinctHolds_allDistinctHolds {
  __typename: "AllDistinctHoldsOutput";
  error: string | null;
  ok: boolean;
  holds: allDistinctHolds_allDistinctHolds_holds[] | null;
}

export interface allDistinctHolds {
  allDistinctHolds: allDistinctHolds_allDistinctHolds;
}
