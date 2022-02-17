/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_userProfile_user {
  __typename: "User";
  id: number;
  email: string;
  affiliatedBoxId: number | null;
  name: string;
  profileImg: string | null;
  role: UserRole;
  verified: boolean;
}

export interface userProfile_userProfile {
  __typename: "UserProfileOutput";
  error: string | null;
  ok: boolean;
  user: userProfile_userProfile_user | null;
}

export interface userProfile {
  userProfile: userProfile_userProfile;
}

export interface userProfileVariables {
  userId: number;
}
