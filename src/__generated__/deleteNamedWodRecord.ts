/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteNamedWodInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteNamedWodRecord
// ====================================================

export interface deleteNamedWodRecord_deleteNamedWodRecord {
  __typename: "DeleteNamedWodOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteNamedWodRecord {
  deleteNamedWodRecord: deleteNamedWodRecord_deleteNamedWodRecord;
}

export interface deleteNamedWodRecordVariables {
  input: DeleteNamedWodInput;
}
