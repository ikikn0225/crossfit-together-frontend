import { _WodCategoryLink } from "@/theme/components/_Wod"
import { UserRole } from "@/__generated__/globalTypes"
import React from "react"


interface ICategoryProps {
    id:number;
    name:string;
}

export const Category: React.FC<ICategoryProps> = ({id, name}) => (
    <_WodCategoryLink key={id} to={`/wods/${name}`}>#{name}</_WodCategoryLink>
)