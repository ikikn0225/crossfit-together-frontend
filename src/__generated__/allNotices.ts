/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allNotices
// ====================================================

export interface allNotices_allNotices_notices {
  __typename: "Notice";
  id: number;
  title: string;
  coverImg: string | null;
  contents: string;
  createdAt: any;
}

export interface allNotices_allNotices {
  __typename: "AllNoticeOutput";
  error: string | null;
  ok: boolean;
  notices: allNotices_allNotices_notices[] | null;
}

export interface allNotices {
  allNotices: allNotices_allNotices;
}
