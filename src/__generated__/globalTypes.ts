/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AffiliatedBoxList {
  CrossFit_4TP = "CrossFit_4TP",
  CrossFit_ABLE_2AH = "CrossFit_ABLE_2AH",
  CrossFit_Ironheart = "CrossFit_Ironheart",
  CrossFit_KTG = "CrossFit_KTG",
  Woori_CrossFit = "Woori_CrossFit",
}

export enum UserRole {
  Coach = "Coach",
  Crossfiter = "Crossfiter",
}

export interface CreateAccountInput {
  name: string;
  profileImg?: string | null;
  email: string;
  password: string;
  role: UserRole;
  myBox?: AffiliatedBoxList | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
