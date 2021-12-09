/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allMyBoardofRecords
// ====================================================

export interface allMyBoardofRecords_allMyBoardofRecords_bors {
  __typename: "Bor";
  id: number;
  content: string;
}

export interface allMyBoardofRecords_allMyBoardofRecords {
  __typename: "AllMyBoardofRecordOutput";
  ok: boolean;
  error: string | null;
  bors: allMyBoardofRecords_allMyBoardofRecords_bors[];
}

export interface allMyBoardofRecords {
  allMyBoardofRecords: allMyBoardofRecords_allMyBoardofRecords;
}
