/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateNamedWodRecordInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createNamedWodRecord
// ====================================================

export interface createNamedWodRecord_createNamedWodRecord {
  __typename: "CreateNamedWodRecordOutput";
  ok: boolean;
  error: string | null;
}

export interface createNamedWodRecord {
  createNamedWodRecord: createNamedWodRecord_createNamedWodRecord;
}

export interface createNamedWodRecordVariables {
  input: CreateNamedWodRecordInput;
}
