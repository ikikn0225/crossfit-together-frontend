/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myAffiliatedBoxQuery
// ====================================================

export interface myAffiliatedBoxQuery_myAffiliatedBox_affiliatedBox {
  __typename: "AffiliatedBox";
  id: number;
  name: string;
  coverImg: string | null;
  address: string;
}

export interface myAffiliatedBoxQuery_myAffiliatedBox {
  __typename: "MyAffiliatedBoxOutput";
  affiliatedBox: myAffiliatedBoxQuery_myAffiliatedBox_affiliatedBox;
}

export interface myAffiliatedBoxQuery {
  myAffiliatedBox: myAffiliatedBoxQuery_myAffiliatedBox;
}
