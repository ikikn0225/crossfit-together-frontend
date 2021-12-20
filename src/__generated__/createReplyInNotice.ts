/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReplyInNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createReplyInNotice
// ====================================================

export interface createReplyInNotice_createReplyInNotice {
  __typename: "CreateReplyInNoticeOutput";
  error: string | null;
  ok: boolean;
}

export interface createReplyInNotice {
  createReplyInNotice: createReplyInNotice_createReplyInNotice;
}

export interface createReplyInNoticeVariables {
  input: CreateReplyInNoticeInput;
}
