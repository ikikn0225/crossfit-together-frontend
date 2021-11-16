/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOneRmRecordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOneRmRecord
// ====================================================

export interface createOneRmRecord_createOneRmRecord {
  __typename: "CreateOneRmRecordOutput";
  ok: boolean;
  error: string | null;
}

export interface createOneRmRecord {
  createOneRmRecord: createOneRmRecord_createOneRmRecord;
}

export interface createOneRmRecordVariables {
  input: CreateOneRmRecordInput;
}
