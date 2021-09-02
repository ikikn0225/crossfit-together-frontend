/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OneWodInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: wod
// ====================================================

export interface wod_wod_wod_likes {
  __typename: "Like";
  id: number;
}

export interface wod_wod_wod {
  __typename: "Wod";
  id: number;
  title: string;
  content: string;
  titleDate: any | null;
  likes: wod_wod_wod_likes[];
}

export interface wod_wod {
  __typename: "OneWodOutput";
  ok: boolean;
  error: string | null;
  wod: wod_wod_wod | null;
}

export interface wod {
  wod: wod_wod;
}

export interface wodVariables {
  input: OneWodInput;
}
