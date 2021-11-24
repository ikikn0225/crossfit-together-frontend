/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: distinctHoldList
// ====================================================

export interface distinctHoldList_distinctHoldList_pageInfo {
  __typename: "HoldPageInfo";
  endCursor: number;
  hasNextPage: boolean;
}

export interface distinctHoldList_distinctHoldList_edges_node_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface distinctHoldList_distinctHoldList_edges_node {
  __typename: "Hold";
  id: number;
  holdAt: any;
  owner: distinctHoldList_distinctHoldList_edges_node_owner;
}

export interface distinctHoldList_distinctHoldList_edges {
  __typename: "HoldEdge";
  cursor: number;
  node: distinctHoldList_distinctHoldList_edges_node;
}

export interface distinctHoldList_distinctHoldList {
  __typename: "HoldListOutput";
  pageInfo: distinctHoldList_distinctHoldList_pageInfo | null;
  edges: distinctHoldList_distinctHoldList_edges[] | null;
}

export interface distinctHoldList {
  distinctHoldList: distinctHoldList_distinctHoldList;
}

export interface distinctHoldListVariables {
  first?: number | null;
  after?: number | null;
}
