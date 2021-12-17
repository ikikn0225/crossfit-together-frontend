/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllCommentsInNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allCommentsInNotice
// ====================================================

export interface allCommentsInNotice_allCommentsInNotice_comments_owner {
  __typename: "User";
  id: number;
  name: string;
  profileImg: string | null;
}

export interface allCommentsInNotice_allCommentsInNotice_comments {
  __typename: "Comment";
  id: number;
  content: string;
  owner: allCommentsInNotice_allCommentsInNotice_comments_owner;
  createdAt: any;
}

export interface allCommentsInNotice_allCommentsInNotice {
  __typename: "AllCommentsInNoticeOutput";
  comments: allCommentsInNotice_allCommentsInNotice_comments[] | null;
}

export interface allCommentsInNotice {
  allCommentsInNotice: allCommentsInNotice_allCommentsInNotice;
}

export interface allCommentsInNoticeVariables {
  input: AllCommentsInNoticeInput;
}
