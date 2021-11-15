/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum NamedWodsList {
  Angie = "Angie",
  Annie = "Annie",
  Arnie = "Arnie",
  Barbara = "Barbara",
  Chelsea = "Chelsea",
  Cindy = "Cindy",
  Danny = "Danny",
  Diane = "Diane",
  Elizabeth = "Elizabeth",
  Filthy_Fifty_Crossfit_WOD = "Filthy_Fifty_Crossfit_WOD",
  Fran = "Fran",
  Frelen = "Frelen",
  Helen = "Helen",
  Isabel = "Isabel",
  JT = "JT",
  Jackie = "Jackie",
  Jag_28 = "Jag_28",
  Karen = "Karen",
  Kelly = "Kelly",
  Linda = "Linda",
  Luce = "Luce",
  Lynne = "Lynne",
  Mary = "Mary",
  Murph = "Murph",
  Nancy = "Nancy",
  Nate = "Nate",
  Nick = "Nick",
  Nicole = "Nicole",
  Nuts = "Nuts",
  Roy = "Roy",
  The_Chief_WOD = "The_Chief_WOD",
  The_Glen_WOD = "The_Glen_WOD",
  The_Longest_Mile = "The_Longest_Mile",
  The_Seven_The_CIA_Seven = "The_Seven_The_CIA_Seven",
  Tom = "Tom",
  Zeus_WOD = "Zeus_WOD",
}

export enum OneRmList {
  Back_squat = "Back_squat",
  Bench_press = "Bench_press",
  Clean = "Clean",
  Clean_and_jerk = "Clean_and_jerk",
  Deadlift = "Deadlift",
  Front_squat = "Front_squat",
  Hang_clean = "Hang_clean",
  Hang_power_clean = "Hang_power_clean",
  Hang_power_snatch = "Hang_power_snatch",
  Hang_snatch = "Hang_snatch",
  Muscle_snatch = "Muscle_snatch",
  Overhead_squat = "Overhead_squat",
  Power_Clean = "Power_Clean",
  Power_Snatch = "Power_Snatch",
  Push_jerk = "Push_jerk",
  Push_press = "Push_press",
  Shoulder_press = "Shoulder_press",
  Snatch = "Snatch",
  Snatch_balance_3x1 = "Snatch_balance_3x1",
  Split_jerk = "Split_jerk",
  Sumo_deadlift = "Sumo_deadlift",
  Thruster = "Thruster",
  Turkish_get_up = "Turkish_get_up",
  Weighted_dip = "Weighted_dip",
  Weighted_pull_up = "Weighted_pull_up",
  Weighted_ring_dip = "Weighted_ring_dip",
}

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

export interface AllNamedWodRecordsInput {
  namedWod: NamedWodsList;
}

export interface AllOneRmRecordsInput {
  oneRm: OneRmList;
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
