/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Coach = "Coach",
  Crossfiter = "Crossfiter",
}

export interface AllBoardofRecordInput {
  id: number;
}

export interface AllLikesInWodInput {
  wodId: number;
}

export interface AllWodsInput {
  slug?: string | null;
}

export interface CreateAccountInput {
  name: string;
  profileImg?: string | null;
  email: string;
  password: string;
  role: UserRole;
  myBox?: string | null;
}

export interface CreateAffiliatedBoxInput {
  name: string;
  coverImg?: string | null;
  address: string;
}

export interface CreateBorInput {
  content: string;
  wodId: number;
}

export interface CreateLikeInWodInput {
  wodId: number;
}

export interface CreateWodInput {
  title: string;
  titleDate?: any | null;
  content: string;
  categoryId: number;
}

export interface DeleteBorInput {
  id: number;
}

export interface DeleteLikeInWodInput {
  wodId: number;
}

export interface DeleteWodInput {
  wodId: number;
}

export interface EditBorInput {
  content?: string | null;
  borId: number;
}

export interface EditWodInput {
  title?: string | null;
  titleDate?: any | null;
  content?: string | null;
  wodId: number;
  categoryId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface OneWodInput {
  wodId: number;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
