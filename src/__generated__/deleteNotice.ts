/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteNotice
// ====================================================

export interface deleteNotice_deleteNotice {
  __typename: "DeleteNoticeOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteNotice {
  deleteNotice: deleteNotice_deleteNotice;
}

export interface deleteNoticeVariables {
  input: DeleteNoticeInput;
}
