/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCommentInNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editCommentInNotice
// ====================================================

export interface editCommentInNotice_editCommentInNotice {
  __typename: "EditCommentInNoticeOutput";
  error: string | null;
  ok: boolean;
}

export interface editCommentInNotice {
  editCommentInNotice: editCommentInNotice_editCommentInNotice;
}

export interface editCommentInNoticeVariables {
  input: EditCommentInNoticeInput;
}
