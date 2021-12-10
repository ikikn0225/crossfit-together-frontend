import { _NoticeListContent, _NoticeListLayout, _NoticeListTitle } from "@/theme/components/_Notice"



interface INoticeProps {
    id:number;
    title:string;
    contents:string;
    coverImg:string|null;
    createAt:Date;
}

export const Notice:React.FC<INoticeProps> = ({title, contents, coverImg, createAt}) => {

        return(
            <_NoticeListLayout>
                <_NoticeListTitle>{title}</_NoticeListTitle>
                <_NoticeListContent>{contents}</_NoticeListContent>
            </_NoticeListLayout>
        )
}