/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OneNoticeInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: notice
// ====================================================

export interface notice_notice_notice_comments {
  __typename: "Comment";
  id: number;
  content: string;
  createdAt: any;
}

export interface notice_notice_notice_owner {
  __typename: "User";
  id: number;
  name: string;
  role: UserRole;
}

export interface notice_notice_notice {
  __typename: "Notice";
  id: number;
  title: string;
  contents: string;
  coverImg: string | null;
  createdAt: any;
  comments: notice_notice_notice_comments[];
  owner: notice_notice_notice_owner;
}

export interface notice_notice {
  __typename: "OneNoticeOutput";
  ok: boolean;
  error: string | null;
  notice: notice_notice_notice | null;
}

export interface notice {
  notice: notice_notice;
}

export interface noticeVariables {
  input: OneNoticeInput;
}
