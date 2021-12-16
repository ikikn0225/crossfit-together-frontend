import { BoardOfRecord } from "@/pages/user/board-of-record/board-of-record";
import Spinner from "@/components/spinner";
import { Wod } from "@/pages/user/wod/wod";
import { useMe } from "@/hooks/useMe";
import { _BoardCreateBoardContainer, _BoardCreateWodButton, _BoardCreateWodButtonContainer, _BoardImg, _BoardImgContainer, _BoardImgTitle, _BoardListContainer, _BoardListSubContainer, _BoardNoContent } from "@/theme/components/_BoardOfRecords"
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { _WodNoContent } from "@/theme/components/_Wod";
import { allBoardofRecords } from "@/__generated__/allBoardofRecords";
import { wodList } from "@/__generated__/wodList";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"
import { IWodEdge, WOD_LIST } from "../wod/wods";

export const ALL_BOARD_OF_RECORDS = gql`
    query allBoardofRecords($input:AllBoardofRecordInput!) {
        allBoardofRecords(input:$input) {
            ok
            error
            bors {
                id
                content
                owner {
                    id
                }
            }
        }
    }
`;


export const BoardOfRecords = () => {
    const { data, loading, error } = useMe();
    const loader = useRef<HTMLDivElement>(null);
    const [wodTrigger, setWodTrigger] = useState<boolean>(false);
    const delay = true;
    const { loading:wodLoading, error:wodListError, data:wodList, fetchMore, refetch, networkStatus } = useQuery<wodList>(WOD_LIST, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        setWodTrigger(target.isIntersecting);
    }, []);

    const fetchWod = async () => {
        setWodTrigger(false);
        await fetchMore({
            variables: {
                after:wodList?.wodList.pageInfo?.endCursor,
                delay,
            },
        })
    }

    useEffect(() => {   //일반 함수에는 gql 데이터가 들어가지 않아 트리거를 사용함.
        if(wodList?.wodList.pageInfo?.hasNextPage) {
            if(wodTrigger) {
                fetchWod();
            }
        }
    }, [wodTrigger]);
    
    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if(loader && loader.current) {
            observer.observe(loader.current);
        }
    }, [handleObserver]);

    if (!data || loading || error) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }

    return(
        <>
            <Helmet>
                <title>Board of Record | CrossfiTogether</title>
            </Helmet>
            <_BoardImgContainer>
                <_BoardImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_BoardImg> 
                <_BoardImgTitle>WOD 기록</_BoardImgTitle>
            </_BoardImgContainer>
            <_BoardListContainer>
                <_BoardListSubContainer>
                    {wodList?.wodList.edges?.length !== 0
                    ? (
                        wodList?.wodList.edges?.map((wod:IWodEdge) => (
                            <div key={wod.node.title}>
                                <Wod 
                                    key={wod.node.title}
                                    role={data.me.role}
                                    userId={data.me.id}
                                    id={wod.node.id}
                                    title={wod.node.title}
                                    titleDate={wod.node.titleDate}
                                    content={wod.node.content}
                                    borPage={true}
                                />
                                <BoardOfRecord wodId={wod.node.id} userId={data.me.id} />
                            </div>
                        ))
                    )
                    : (
                        <_BoardNoContent >Sorry, No Rep!</_BoardNoContent>
                    )}
                    {wodLoading && 
                        <Spinner />
                    }
                    <div ref={loader} />
                </_BoardListSubContainer>
            </_BoardListContainer>
        </>
    )
}