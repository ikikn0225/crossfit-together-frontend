/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateNoticeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createNotice
// ====================================================

export interface createNotice_createNotice {
  __typename: "CreateNoticeOutput";
  ok: boolean;
  error: string | null;
}

export interface createNotice {
  createNotice: createNotice_createNotice;
}

export interface createNoticeVariables {
  input: CreateNoticeInput;
}
