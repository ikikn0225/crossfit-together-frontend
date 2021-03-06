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
  Filthy_Fifty = "Filthy_Fifty",
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
  The_Chief = "The_Chief",
  The_Glen = "The_Glen",
  The_Longest_Mile = "The_Longest_Mile",
  Tom = "Tom",
  Zeus = "Zeus",
}

export enum OneRmList {
  Back_Squat = "Back_Squat",
  Bench_Press = "Bench_Press",
  Clean = "Clean",
  Clean_and_Jerk = "Clean_and_Jerk",
  Deadlift = "Deadlift",
  Front_Squat = "Front_Squat",
  Hang_Clean = "Hang_Clean",
  Hang_Power_Clean = "Hang_Power_Clean",
  Hang_Power_Snatch = "Hang_Power_Snatch",
  Hang_Snatch = "Hang_Snatch",
  Overhead_Squat = "Overhead_Squat",
  Power_Clean = "Power_Clean",
  Power_Snatch = "Power_Snatch",
  Push_Jerk = "Push_Jerk",
  Push_Press = "Push_Press",
  Shoulder_Press = "Shoulder_Press",
  Snatch = "Snatch",
  Split_Jerk = "Split_Jerk",
  Thruster = "Thruster",
}

export enum UserRole {
  Coach = "Coach",
  Crossfiter = "Crossfiter",
}

export interface AddTimeTableInput {
  timeTableImg?: string | null;
}

export interface AllBoardofRecordInput {
  id: number;
}

export interface AllCommentsInNoticeInput {
  noticeId: number;
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

export interface AllRepliesInNoticeInput {
  commentId: number;
}

export interface AllSpecificFreeTrialsInput {
  freeTrialAt?: any | null;
}

export interface AllSpecificHoldsInput {
  holdAt?: any | null;
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

export interface CreateCommentInNoticeInput {
  content: string;
  noticeId: number;
}

export interface CreateLikeInWodInput {
  wodId: number;
}

export interface CreateNamedWodRecordInput {
  namedWod: NamedWodsList;
  record: number;
}

export interface CreateNoticeInput {
  title: string;
  coverImg?: string | null;
  contents: string;
}

export interface CreateOneRmRecordInput {
  oneRm: OneRmList;
  record: number;
}

export interface CreateReplyInNoticeInput {
  content: string;
  commentId: number;
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

export interface DeleteCommentInNoticeInput {
  id: number;
}

export interface DeleteFreeTrialInput {
  id: number;
}

export interface DeleteHoldInput {
  id: number;
}

export interface DeleteLikeInWodInput {
  wodId: number;
}

export interface DeleteNamedWodInput {
  namedWodId: number;
}

export interface DeleteNoticeInput {
  noticeId: number;
}

export interface DeleteOneRmInput {
  oneRmId: number;
}

export interface DeleteReplyInNoticeInput {
  id: number;
}

export interface DeleteWodInput {
  wodId: number;
}

export interface EditBorInput {
  content?: string | null;
  borId: number;
}

export interface EditCommentInNoticeInput {
  content?: string | null;
  commentId: number;
}

export interface EditNamedWodRecordInput {
  record?: number | null;
  namedWodId: number;
}

export interface EditNoticeInput {
  title?: string | null;
  coverImg?: string | null;
  contents?: string | null;
  noticeId: number;
}

export interface EditOneRmRecordInput {
  record?: number | null;
  oneRmId: number;
}

export interface EditPasswordInput {
  password?: string | null;
  currentPw: string;
  changePw: string;
}

export interface EditReplyInNoticeInput {
  content?: string | null;
  replyId: number;
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

export interface MyBoardofRecordInput {
  id: number;
  userId: number;
}

export interface MyFreeTrialInput {
  affiliatedBoxId?: number | null;
}

export interface MyNamedWodRecordsInput {
  namedWod: NamedWodsList;
}

export interface MyOneRmRecordsInput {
  oneRm: OneRmList;
}

export interface OneNoticeInput {
  noticeId: number;
}

export interface OneWodInput {
  wodId: number;
}

export interface RegisterFreeTrialInput {
  freeTrialAt: any;
}

export interface RegisterHoldInput {
  holdAt: any;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
