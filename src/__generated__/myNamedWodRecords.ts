/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyNamedWodRecordsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myNamedWodRecords
// ====================================================

export interface myNamedWodRecords_myNamedWodRecords_lbNamedWods_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface myNamedWodRecords_myNamedWodRecords_lbNamedWods {
  __typename: "LeaderBoardNamedWod";
  id: number;
  record: number;
  owner: myNamedWodRecords_myNamedWodRecords_lbNamedWods_owner;
}

export interface myNamedWodRecords_myNamedWodRecords {
  __typename: "MyNamedWodRecordsOutput";
  ok: boolean;
  error: string | null;
  lbNamedWods: myNamedWodRecords_myNamedWodRecords_lbNamedWods | null;
}

export interface myNamedWodRecords {
  myNamedWodRecords: myNamedWodRecords_myNamedWodRecords;
}

export interface myNamedWodRecordsVariables {
  input: MyNamedWodRecordsInput;
}
