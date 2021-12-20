/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllRepliesInNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: repliesInNotice
// ====================================================

export interface repliesInNotice_repliesInNotice_replies_owner {
  __typename: "User";
  id: number;
  name: string;
  profileImg: string | null;
}

export interface repliesInNotice_repliesInNotice_replies {
  __typename: "Reply";
  id: number;
  content: string;
  createdAt: any;
  owner: repliesInNotice_repliesInNotice_replies_owner;
}

export interface repliesInNotice_repliesInNotice {
  __typename: "AllRepliesInNoticeOutput";
  error: string | null;
  ok: boolean;
  replies: repliesInNotice_repliesInNotice_replies[] | null;
}

export interface repliesInNotice {
  repliesInNotice: repliesInNotice_repliesInNotice;
}

export interface repliesInNoticeVariables {
  input: AllRepliesInNoticeInput;
}
