/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allCategories
// ====================================================

export interface allCategories_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface allCategories_allCategories {
  __typename: "AllCategoriesOutput";
  error: string | null;
  ok: boolean;
  categories: allCategories_allCategories_categories[];
}

export interface allCategories {
  allCategories: allCategories_allCategories;
}
