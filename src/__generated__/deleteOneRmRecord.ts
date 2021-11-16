/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteOneRmInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteOneRmRecord
// ====================================================

export interface deleteOneRmRecord_deleteOneRmRecord {
  __typename: "DeleteOneRmOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteOneRmRecord {
  deleteOneRmRecord: deleteOneRmRecord_deleteOneRmRecord;
}

export interface deleteOneRmRecordVariables {
  input: DeleteOneRmInput;
}
