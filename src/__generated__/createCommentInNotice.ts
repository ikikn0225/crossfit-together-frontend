/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCommentInNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCommentInNotice
// ====================================================

export interface createCommentInNotice_createCommentInNotice {
  __typename: "CreateCommentInNoticeOutput";
  ok: boolean;
  error: string | null;
}

export interface createCommentInNotice {
  createCommentInNotice: createCommentInNotice_createCommentInNotice;
}

export interface createCommentInNoticeVariables {
  input: CreateCommentInNoticeInput;
}
