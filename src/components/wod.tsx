import { _WodDeleteWodButton, _WodListContent, _WodListDay, _WodListLayout, _WodListTitle, _WodUpdateWodLink, _WodUpdateWodLinkContainer } from "@/theme/components/_Wod"
import { UserRole } from "@/__generated__/globalTypes"
import React from "react"


interface IWodProps {
    id:number;
    role:string;
    title:string;
    titleDate:Date;
    content:string;
    onClickDelete:(id:number)=>void;
}

const dayOfWeekAsString = (dayIndex:number) => {
    return ["SUNDAY", "MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"][dayIndex] || '';
};

export const Wod: React.FC<IWodProps> = ({id, role, title, titleDate, content, onClickDelete}) => (
    <_WodListLayout key={title+1}>
        {role == UserRole.Coach && (
            <_WodUpdateWodLinkContainer>
                <div>
                    <_WodUpdateWodLink to={`/edit-wod/${id}`}>Edit Wod</_WodUpdateWodLink>
                </div>
                <div>
                    <_WodDeleteWodButton onClick={() => onClickDelete(id)}>Delete Wod</_WodDeleteWodButton>
                </div>
            </_WodUpdateWodLinkContainer>
        )}
        <_WodListDay>{dayOfWeekAsString(new Date(titleDate).getDay())}</_WodListDay>
        <_WodListTitle key={title+2}>{title}</_WodListTitle>
        <_WodListContent key={title+3}>{content}</_WodListContent>
    </_WodListLayout>
)