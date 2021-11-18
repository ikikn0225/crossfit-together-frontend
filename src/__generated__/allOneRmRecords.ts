/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllOneRmRecordsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allOneRmRecords
// ====================================================

export interface allOneRmRecords_allOneRmRecords_lbOneRms_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface allOneRmRecords_allOneRmRecords_lbOneRms {
  __typename: "LeaderBoardOneRm";
  id: number;
  record: number;
  owner: allOneRmRecords_allOneRmRecords_lbOneRms_owner;
}

export interface allOneRmRecords_allOneRmRecords {
  __typename: "AllOneRmRecordsOutput";
  ok: boolean;
  error: string | null;
  lbOneRms: allOneRmRecords_allOneRmRecords_lbOneRms[] | null;
}

export interface allOneRmRecords {
  allOneRmRecords: allOneRmRecords_allOneRmRecords;
}

export interface allOneRmRecordsVariables {
  input: AllOneRmRecordsInput;
}
