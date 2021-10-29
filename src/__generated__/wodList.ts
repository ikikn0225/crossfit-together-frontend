/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: wodList
// ====================================================

export interface wodList_wodList_wodListResponse_pageInfo {
  __typename: "PageInfo";
  endCursor: number;
  hasNextPage: boolean;
}

export interface wodList_wodList_wodListResponse_edges_node_likes {
  __typename: "Like";
  id: number;
}

export interface wodList_wodList_wodListResponse_edges_node {
  __typename: "Wod";
  id: number;
  title: string;
  content: string;
  titleDate: any | null;
  likes: wodList_wodList_wodListResponse_edges_node_likes[];
}

export interface wodList_wodList_wodListResponse_edges {
  __typename: "Edge";
  cursor: number;
  node: wodList_wodList_wodListResponse_edges_node;
}

export interface wodList_wodList_wodListResponse {
  __typename: "WodListResponse";
  pageInfo: wodList_wodList_wodListResponse_pageInfo;
  edges: wodList_wodList_wodListResponse_edges[];
}

export interface wodList_wodList {
  __typename: "WodListOutput";
  wodListResponse: wodList_wodList_wodListResponse | null;
}

export interface wodList {
  wodList: wodList_wodList;
}

export interface wodListVariables {
  first?: number | null;
  after?: number | null;
}
