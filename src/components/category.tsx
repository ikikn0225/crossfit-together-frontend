import { _WodCategoryLink } from "@/theme/components/_Wod"
import { UserRole } from "@/__generated__/globalTypes"
import React from "react"


interface ICategoryProps {
    id:number;
    name:string;
    slug:string;
}

export const Category: React.FC<ICategoryProps> = ({id, name, slug}) => (
    <_WodCategoryLink key={id} to={`/wods/${slug}`}>#{name}</_WodCategoryLink>
)