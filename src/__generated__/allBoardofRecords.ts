/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllBoardofRecordInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allBoardofRecords
// ====================================================

export interface allBoardofRecords_allBoardofRecords_bors_owner {
  __typename: "User";
  id: number;
  name: string;
}

export interface allBoardofRecords_allBoardofRecords_bors {
  __typename: "Bor";
  id: number;
  content: string;
  owner: allBoardofRecords_allBoardofRecords_bors_owner;
}

export interface allBoardofRecords_allBoardofRecords {
  __typename: "AllBoardofRecordOutput";
  ok: boolean;
  error: string | null;
  bors: allBoardofRecords_allBoardofRecords_bors[];
}

export interface allBoardofRecords {
  allBoardofRecords: allBoardofRecords_allBoardofRecords;
}

export interface allBoardofRecordsVariables {
  input: AllBoardofRecordInput;
}
