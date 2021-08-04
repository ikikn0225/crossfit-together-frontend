/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allAffiliatedBoxesQuery
// ====================================================

export interface allAffiliatedBoxesQuery_allAffiliatedBoxes_allAffiliatedBoxes {
  __typename: "AffiliatedBox";
  name: string;
}

export interface allAffiliatedBoxesQuery_allAffiliatedBoxes {
  __typename: "AllAffiliatedBoxesOutput";
  ok: boolean;
  error: string | null;
  allAffiliatedBoxes: allAffiliatedBoxesQuery_allAffiliatedBoxes_allAffiliatedBoxes[] | null;
}

export interface allAffiliatedBoxesQuery {
  allAffiliatedBoxes: allAffiliatedBoxesQuery_allAffiliatedBoxes;
}
