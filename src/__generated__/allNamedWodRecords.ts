/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllNamedWodRecordsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allNamedWodRecords
// ====================================================

export interface allNamedWodRecords_allNamedWodRecords_lbNamedWods_owner {
  __typename: "User";
  name: string;
}

export interface allNamedWodRecords_allNamedWodRecords_lbNamedWods {
  __typename: "LeaderBoardNamedWod";
  id: number;
  record: number;
  owner: allNamedWodRecords_allNamedWodRecords_lbNamedWods_owner;
}

export interface allNamedWodRecords_allNamedWodRecords {
  __typename: "AllNamedWodRecordsOutput";
  ok: boolean;
  error: string | null;
  lbNamedWods: allNamedWodRecords_allNamedWodRecords_lbNamedWods[] | null;
}

export interface allNamedWodRecords {
  allNamedWodRecords: allNamedWodRecords_allNamedWodRecords;
}

export interface allNamedWodRecordsVariables {
  input: AllNamedWodRecordsInput;
}
