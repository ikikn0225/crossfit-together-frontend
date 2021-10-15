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

export interface CreateWodInput {
  title: string;
  titleDate?: any | null;
  content: string;
  categoryId: number;
}

export interface DeleteWodInput {
  wodId: number;
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

export interface WodListInput {
  first?: number | null;
  after?: number | null;
  delay?: boolean | null;
  slug?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
