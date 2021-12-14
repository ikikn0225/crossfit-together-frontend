import { _NoticeListContent, 
    _NoticeListFooter, 
    _NoticeListLayout, 
    _NoticeListLike, 
    _NoticeListLink, 
    _NoticeListProfile,
    _NoticeListProfileName, 
    _NoticeListTitle } from "@/theme/components/_Notice"
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";


interface INoticeProps {
    id:number;
    title:string;
    contents:string;
    coverImg:string|null;
    createAt:Date;
    owner:IOwner;
}

interface IOwner {
    name:string;
    profileImg:string|null;
}

export const Notice:React.FC<INoticeProps> = ({id, title, contents, coverImg, createAt, owner}) => {

        return(
            <_NoticeListLayout>
                <_NoticeListLink to={`/notice/${id}`}>
                    {coverImg && (
                        <img src={coverImg} alt="컨텐츠 이미지" />
                    )}
                    <_NoticeListTitle>{title}</_NoticeListTitle>
                    <div>
                        <_NoticeListContent>{contents}</_NoticeListContent>
                    </div>
                </_NoticeListLink>
                <_NoticeListFooter>
                    <_NoticeListProfile>
                        {owner.profileImg && (
                            <img src={owner.profileImg} alt="작성자 이미지" />
                        )}
                        <_NoticeListProfileName>by {owner.name}</_NoticeListProfileName>
                    </_NoticeListProfile>
                    <div>{new Date(createAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }).substring(0, 13)}</div>
                </_NoticeListFooter>
            </_NoticeListLayout>
        )
}