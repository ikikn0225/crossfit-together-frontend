/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyOneRmRecordsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myOneRmRecords
// ====================================================

export interface myOneRmRecords_myOneRmRecords_lbOneRms_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface myOneRmRecords_myOneRmRecords_lbOneRms {
  __typename: "LeaderBoardOneRm";
  id: number;
  record: number;
  owner: myOneRmRecords_myOneRmRecords_lbOneRms_owner;
}

export interface myOneRmRecords_myOneRmRecords {
  __typename: "MyOneRmRecordsOutput";
  ok: boolean;
  error: string | null;
  lbOneRms: myOneRmRecords_myOneRmRecords_lbOneRms | null;
}

export interface myOneRmRecords {
  myOneRmRecords: myOneRmRecords_myOneRmRecords;
}

export interface myOneRmRecordsVariables {
  input: MyOneRmRecordsInput;
}
