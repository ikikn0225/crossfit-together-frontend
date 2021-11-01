/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: wodList
// ====================================================

export interface wodList_wodList_pageInfo {
  __typename: "PageInfo";
  endCursor: number;
  hasNextPage: boolean;
}

export interface wodList_wodList_edges_node_likes {
  __typename: "Like";
  id: number;
}

export interface wodList_wodList_edges_node {
  __typename: "Wod";
  id: number;
  title: string;
  content: string;
  titleDate: any | null;
  likes: wodList_wodList_edges_node_likes[];
}

export interface wodList_wodList_edges {
  __typename: "Edge";
  cursor: number;
  node: wodList_wodList_edges_node;
}

export interface wodList_wodList {
  __typename: "WodListOutput";
  pageInfo: wodList_wodList_pageInfo | null;
  edges: wodList_wodList_edges[] | null;
}

export interface wodList {
  wodList: wodList_wodList;
}

export interface wodListVariables {
  first?: number | null;
  after?: number | null;
}
