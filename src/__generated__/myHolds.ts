/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myHolds
// ====================================================

export interface myHolds_myHolds_holds {
  __typename: "Hold";
  id: number;
  holdAt: any;
}

export interface myHolds_myHolds {
  __typename: "MyHoldsOutput";
  error: string | null;
  ok: boolean;
  holds: myHolds_myHolds_holds[];
}

export interface myHolds {
  myHolds: myHolds_myHolds;
}
