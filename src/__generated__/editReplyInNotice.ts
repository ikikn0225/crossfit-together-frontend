/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditReplyInNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editReplyInNotice
// ====================================================

export interface editReplyInNotice_editReplyInNotice {
  __typename: "EditReplyInNoticeOutput";
  error: string | null;
  ok: boolean;
}

export interface editReplyInNotice {
  editReplyInNotice: editReplyInNotice_editReplyInNotice;
}

export interface editReplyInNoticeVariables {
  input: EditReplyInNoticeInput;
}
