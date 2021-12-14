import Spinner from "@/components/spinner";
import { useMe } from "@/hooks/useMe";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { _NoticeCreateNoticeButton, _NoticeCreateNoticeButtonContainer, _NoticeImg, _NoticeImgContainer, _NoticeImgTitle, _NoticeListContainer, _NoticeListSubContainer, _NoticeNoContent } from "@/theme/components/_Notice"
import { allNotices } from "@/__generated__/allNotices";
import { gql, useQuery } from "@apollo/client"
import { Helmet } from "react-helmet-async"
import { useHistory } from "react-router-dom";
import { Notice } from "./notice";

export const ALL_NOTICES = gql`
    query allNotices {
        allNotices {
            error
            ok
            notices {
                id
                title
                coverImg
                contents
                createdAt
                owner {
                    name
                    profileImg
                }
            }
        }
    }
`;

export interface INoticeProps {
    id:number;
    title:string;
    contents:string;
    coverImg:string|null;
    createdAt:Date;
    owner:IOwner;
}

interface IOwner {
    name:string;
    profileImg:string|null;
}

export const Notices = () => {
    const { data:me, loading, error } = useMe();
    const history = useHistory();
    const { loading:noticesLoading, error:noticesError, data:allNotices, fetchMore, refetch, networkStatus } = useQuery<allNotices>(ALL_NOTICES);
    console.log(me);

    const gotoCreateNotice = () => {
        history.push("/create-notice");
    }

    if (!me || loading || error) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }
    
    return(
        <>
            <Helmet>
                <title>Notice | CrossfiTogether</title>
            </Helmet>
            <_NoticeImgContainer>
                <_NoticeImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_NoticeImg> 
                <_NoticeImgTitle>Notice</_NoticeImgTitle>
            </_NoticeImgContainer>
            <_NoticeCreateNoticeButtonContainer>
                <_NoticeCreateNoticeButton onClick={gotoCreateNotice}>Create Notice</_NoticeCreateNoticeButton>
            </_NoticeCreateNoticeButtonContainer>
            <_NoticeListContainer>
                <_NoticeListSubContainer>
                    {allNotices?.allNotices.notices?.length !== 0
                    ? (
                        allNotices?.allNotices.notices?.map((notice:INoticeProps) => (
                            // <div key={notice.id}>
                                <Notice
                                    key={notice.id}
                                    id={notice.id}
                                    title={notice.title}
                                    contents={notice.contents}
                                    coverImg={notice.coverImg}
                                    createAt={notice.createdAt}
                                    owner={notice.owner}
                                />
                            // </div>
                        ))
                    )
                    : (
                        <_NoticeNoContent>Sorry, No Rep!</_NoticeNoContent>
                    )}
                    {noticesLoading && 
                        <Spinner />
                    }
                    {/* <div ref={loader} /> */}
                </_NoticeListSubContainer>
            </_NoticeListContainer>
        </>
    )
}