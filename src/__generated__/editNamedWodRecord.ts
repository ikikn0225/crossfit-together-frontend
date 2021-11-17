/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditNamedWodRecordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editNamedWodRecord
// ====================================================

export interface editNamedWodRecord_editNamedWodRecord {
  __typename: "EditNamedWodRecordOutput";
  error: string | null;
  ok: boolean;
}

export interface editNamedWodRecord {
  editNamedWodRecord: editNamedWodRecord_editNamedWodRecord;
}

export interface editNamedWodRecordVariables {
  input: EditNamedWodRecordInput;
}
