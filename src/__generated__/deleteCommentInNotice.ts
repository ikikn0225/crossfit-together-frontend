/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCommentInNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteCommentInNotice
// ====================================================

export interface deleteCommentInNotice_deleteCommentInNotice {
  __typename: "DeleteCommentInNoticeOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteCommentInNotice {
  deleteCommentInNotice: deleteCommentInNotice_deleteCommentInNotice;
}

export interface deleteCommentInNoticeVariables {
  input: DeleteCommentInNoticeInput;
}
