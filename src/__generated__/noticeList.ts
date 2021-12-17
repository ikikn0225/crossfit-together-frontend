/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: noticeList
// ====================================================

export interface noticeList_noticeList_pageInfo {
  __typename: "NoticePageInfo";
  endCursor: number;
  hasNextPage: boolean;
}

export interface noticeList_noticeList_edges_node_owner {
  __typename: "User";
  name: string;
  profileImg: string | null;
}

export interface noticeList_noticeList_edges_node {
  __typename: "Notice";
  id: number;
  title: string;
  coverImg: string | null;
  contents: string;
  createdAt: any;
  owner: noticeList_noticeList_edges_node_owner;
}

export interface noticeList_noticeList_edges {
  __typename: "NoticeEdge";
  cursor: number;
  node: noticeList_noticeList_edges_node;
}

export interface noticeList_noticeList {
  __typename: "NoticeListOutput";
  pageInfo: noticeList_noticeList_pageInfo | null;
  edges: noticeList_noticeList_edges[] | null;
}

export interface noticeList {
  noticeList: noticeList_noticeList;
}

export interface noticeListVariables {
  first?: number | null;
  after?: number | null;
}
