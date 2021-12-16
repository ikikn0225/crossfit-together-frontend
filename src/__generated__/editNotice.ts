/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editNotice
// ====================================================

export interface editNotice_editNotice {
  __typename: "EditNoticeOutput";
  ok: boolean;
  error: string | null;
}

export interface editNotice {
  editNotice: editNotice_editNotice;
}

export interface editNoticeVariables {
  input: EditNoticeInput;
}
