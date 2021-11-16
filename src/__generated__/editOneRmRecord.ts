/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditOneRmRecordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editOneRmRecord
// ====================================================

export interface editOneRmRecord_editOneRmRecord {
  __typename: "EditOneRmRecordOutput";
  error: string | null;
  ok: boolean;
}

export interface editOneRmRecord {
  editOneRmRecord: editOneRmRecord_editOneRmRecord;
}

export interface editOneRmRecordVariables {
  input: EditOneRmRecordInput;
}
