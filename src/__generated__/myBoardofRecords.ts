/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyBoardofRecordInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myBoardofRecords
// ====================================================

export interface myBoardofRecords_myBoardofRecords_bors_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface myBoardofRecords_myBoardofRecords_bors_wod {
  __typename: "Wod";
  id: number;
  title: string;
}

export interface myBoardofRecords_myBoardofRecords_bors {
  __typename: "Bor";
  id: number;
  content: string;
  owner: myBoardofRecords_myBoardofRecords_bors_owner;
  wod: myBoardofRecords_myBoardofRecords_bors_wod;
}

export interface myBoardofRecords_myBoardofRecords {
  __typename: "MyBoardofRecordOutput";
  ok: boolean;
  error: string | null;
  bors: myBoardofRecords_myBoardofRecords_bors[];
}

export interface myBoardofRecords {
  myBoardofRecords: myBoardofRecords_myBoardofRecords;
}

export interface myBoardofRecordsVariables {
  input: MyBoardofRecordInput;
}
