/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allWods
// ====================================================

export interface allWods_allWods_wods_likes {
  __typename: "Like";
  id: number;
}

export interface allWods_allWods_wods {
  __typename: "Wod";
  id: number;
  title: string;
  content: string;
  titleDate: any | null;
  likes: allWods_allWods_wods_likes[];
}

export interface allWods_allWods {
  __typename: "AllWodsOutput";
  ok: boolean;
  error: string | null;
  wods: allWods_allWods_wods[] | null;
}

export interface allWods {
  allWods: allWods_allWods;
}
