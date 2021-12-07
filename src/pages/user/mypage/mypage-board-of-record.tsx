import { _MyPageContainer, _MyPageLeaderBoardContentContainer, _MyPageListBoxContent, _MyPageListBoxContentContainer, _MyPageNoContent, _MyPageSubContainer, _MyPageTitle, _MyPageWodDateSpan } from "@/theme/components/_MyPage";
import { myNamedWodRecords } from "@/__generated__/myNamedWodRecords";
import { myOneRmRecords } from "@/__generated__/myOneRmRecords";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { LeaderBoardTabContainer } from "../leader-board/leader-board-tab-container";
import gql from "graphql-tag";
import { wodList } from "@/__generated__/wodList";
import { IWodEdge, WOD_LIST } from "../wod/wods";
import { Wod } from "@/pages/user/wod/wod";
import { BoardOfRecord } from "@/pages/user/board-of-record/board-of-record";
import Spinner from "@/components/spinner";
import { MyPageBoardOfRecordContent } from "./mypage-board-of-record-content";

interface IMyPageBoardOfRecord {
    me:IMe;
}

interface IMe {
    id:number;
    email:string;
    affiliatedBoxId:number|null;
    name:string;
    profileImg:string|null;
    role:string;
    verified:boolean;
}

export const MyPageBoardOfRecord:React.FC<IMyPageBoardOfRecord> = (me) => {
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

    return(
        <>
            <_MyPageTitle>Board of Record</_MyPageTitle>
            <_MyPageContainer>
                <_MyPageSubContainer>
                    {wodList?.wodList.edges?.length !== 0
                    ? (
                        wodList?.wodList.edges?.map((wod:IWodEdge) => (
                            <MyPageBoardOfRecordContent key={wod.node.title} wodId={wod.node.id} />
                        ))
                    )
                    :(
                        <_MyPageNoContent>Sorry, No Rep!</_MyPageNoContent>
                    )}
                    {wodLoading && 
                        <Spinner />
                    }
                    <div ref={loader} />
                </_MyPageSubContainer>
            </_MyPageContainer>
        </>
    )
}