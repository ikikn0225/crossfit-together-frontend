/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: distinctFreeTrialList
// ====================================================

export interface distinctFreeTrialList_distinctFreeTrialList_pageInfo {
  __typename: "FreeTrialPageInfo";
  endCursor: number;
  hasNextPage: boolean;
}

export interface distinctFreeTrialList_distinctFreeTrialList_edges_node_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface distinctFreeTrialList_distinctFreeTrialList_edges_node {
  __typename: "FreeTrial";
  id: number;
  freeTrialAt: any;
  owner: distinctFreeTrialList_distinctFreeTrialList_edges_node_owner;
}

export interface distinctFreeTrialList_distinctFreeTrialList_edges {
  __typename: "FreeTrialEdge";
  cursor: number;
  node: distinctFreeTrialList_distinctFreeTrialList_edges_node;
}

export interface distinctFreeTrialList_distinctFreeTrialList {
  __typename: "FreeTrialListOutput";
  pageInfo: distinctFreeTrialList_distinctFreeTrialList_pageInfo | null;
  edges: distinctFreeTrialList_distinctFreeTrialList_edges[] | null;
}

export interface distinctFreeTrialList {
  distinctFreeTrialList: distinctFreeTrialList_distinctFreeTrialList;
}

export interface distinctFreeTrialListVariables {
  first?: number | null;
  after?: number | null;
}
