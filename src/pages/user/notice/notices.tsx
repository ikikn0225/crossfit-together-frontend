import Spinner from "@/components/spinner";
import { useMe } from "@/hooks/useMe";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { _NoticeCreateNoticeButton, _NoticeCreateNoticeButtonContainer, _NoticeImg, _NoticeImgContainer, _NoticeImgTitle, _NoticeListContainer, _NoticeListSubContainer, _NoticeNoContent } from "@/theme/components/_Notice"
import { allNotices } from "@/__generated__/allNotices";
import { noticeList } from "@/__generated__/noticeList";
import { gql, useQuery } from "@apollo/client"
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"
import { useHistory } from "react-router-dom";
import { Notice } from "./notice";

export const NOTICE_LIST = gql`
    query noticeList($first: Int, $after: Int) {
        noticeList(first: $first, after: $after) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                cursor
                node {
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
    }
`;

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

export interface INoticeList {
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

export interface INoticeEdge {
    cursor:number;
    node:INoticeList;
}

export const Notices = () => {
    const { data:me, loading, error } = useMe();
    const history = useHistory();
    const loader = useRef<HTMLDivElement>(null);
    const [noticeTrigger, setNoticeTrigger] = useState<boolean>(false);

    const { loading:noticesLoading, error:noticesError, data:allNotices} = useQuery<allNotices>(ALL_NOTICES);
    const delay = true;
    const { loading:noticeLoading, error:noticeListError, data:noticeList, fetchMore, refetch, networkStatus } = useQuery<noticeList>(NOTICE_LIST,{
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        setNoticeTrigger(target.isIntersecting);
    }, []);

    const fetchNotice = async () => {
        await fetchMore({
            variables: {
                after:noticeList?.noticeList.pageInfo?.endCursor,
                delay,
            },
        })
    }

    useEffect(() => {   //일반 함수에는 gql 데이터가 들어가지 않아 트리거를 사용함.
        if(noticeList?.noticeList.pageInfo?.hasNextPage) {
            if(noticeTrigger) {
                fetchNotice();
            }
        }
        setNoticeTrigger(false);
    }, [noticeTrigger]);
    
    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            thresfreeTrial: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if(loader && loader.current) {
            observer.observe(loader.current);
        }
    }, [handleObserver]);

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
                <_NoticeImgTitle>게시판</_NoticeImgTitle>
            </_NoticeImgContainer>
            <_NoticeCreateNoticeButtonContainer>
                <_NoticeCreateNoticeButton onClick={gotoCreateNotice}>게시물 추가하기</_NoticeCreateNoticeButton>
            </_NoticeCreateNoticeButtonContainer>
            <_NoticeListContainer>
                <_NoticeListSubContainer>
                    {noticeList?.noticeList.edges?.length !== 0
                    ? (
                        noticeList?.noticeList.edges?.map((notice:INoticeEdge) => (
                            <Notice 
                                key={notice.node.title}
                                id={notice.node.id}
                                title={notice.node.title}
                                contents={notice.node.contents}
                                coverImg={notice.node.coverImg}
                                createdAt={notice.node.createdAt}
                                owner={notice.node.owner}
                            />
                        ))
                    )
                    : (
                        <_NoticeNoContent>Sorry, No Rep!</_NoticeNoContent>
                    )}
                    {noticesLoading && 
                        <Spinner />
                    }
                    <div ref={loader} />
                </_NoticeListSubContainer>
            </_NoticeListContainer>
        </>
    )
}