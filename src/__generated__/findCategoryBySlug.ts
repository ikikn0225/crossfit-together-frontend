/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findCategoryBySlug
// ====================================================

export interface findCategoryBySlug_findCategoryBySlug_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface findCategoryBySlug_findCategoryBySlug_wods {
  __typename: "Wod";
  id: number;
  title: string;
  titleDate: any | null;
  content: string;
}

export interface findCategoryBySlug_findCategoryBySlug {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  category: findCategoryBySlug_findCategoryBySlug_category;
  wods: findCategoryBySlug_findCategoryBySlug_wods[] | null;
}

export interface findCategoryBySlug {
  findCategoryBySlug: findCategoryBySlug_findCategoryBySlug;
}

export interface findCategoryBySlugVariables {
  input: CategoryInput;
}
