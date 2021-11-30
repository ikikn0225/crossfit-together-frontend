/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddTimeTableInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addTimeTable
// ====================================================

export interface addTimeTable_addTimeTable {
  __typename: "AddTimeTableOutput";
  ok: boolean;
  error: string | null;
}

export interface addTimeTable {
  addTimeTable: addTimeTable_addTimeTable;
}

export interface addTimeTableVariables {
  input: AddTimeTableInput;
}
