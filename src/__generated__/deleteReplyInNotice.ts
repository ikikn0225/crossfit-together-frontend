/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteReplyInNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteReplyInNotice
// ====================================================

export interface deleteReplyInNotice_deleteReplyInNotice {
  __typename: "DeleteReplyInNoticeOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteReplyInNotice {
  deleteReplyInNotice: deleteReplyInNotice_deleteReplyInNotice;
}

export interface deleteReplyInNoticeVariables {
  input: DeleteReplyInNoticeInput;
}
