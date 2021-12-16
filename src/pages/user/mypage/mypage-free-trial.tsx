import { _MyPageContainer, _MyPageLeaderBoardContentContainer, _MyPageListBoxContent, _MyPageListBoxContentContainer, _MyPageNoContent, _MyPageSubContainer, _MyPageTitle, _MyPageWodDateSpan, _MyPageFreeTrialContentContainer, _MyPageFreeTrialContent, _MyPageFreeTrialContentTitle, _MyPageFreeTrialContentDate, _MyPageFreeTrialContentLink } from "@/theme/components/_MyPage";
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
import { myFreeTrial } from "@/__generated__/myFreeTrial";
import { MY_FREETRIAL } from "../free-trial/free-trial";

interface IMyPageMyPageFreeTrial {
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

export const MyPageFreeTrial:React.FC<IMyPageMyPageFreeTrial> = (me) => {
    const { data:myPageFreeTrial, loading:myPageFreeTrialLoading } = useQuery<myFreeTrial>(MY_FREETRIAL, {
        variables: {
            input: {
                affiliatedBoxId:me.me.affiliatedBoxId
            }
        }
    });

    return(
        <>
            <_MyPageContainer>
                <_MyPageSubContainer>
                    <_MyPageTitle>무료 체험</_MyPageTitle>
                    <_MyPageFreeTrialContentLink to="/free-trial">
                        <_MyPageFreeTrialContentContainer>
                            <_MyPageFreeTrialContent>
                                {myPageFreeTrial?.myFreeTrial.freeTrial !== null
                                ? (
                                    <>
                                        <_MyPageFreeTrialContentTitle>예약된 무료체험일</_MyPageFreeTrialContentTitle>
                                        <_MyPageFreeTrialContentDate>{new Date(myPageFreeTrial?.myFreeTrial?.freeTrial.freeTrialAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} 
                                                    &nbsp;({new Date(myPageFreeTrial?.myFreeTrial?.freeTrial.freeTrialAt).toDateString().substring(0, 3)})</_MyPageFreeTrialContentDate>
                                    </>
                                )
                                :(
                                    
                                    <_MyPageFreeTrialContentTitle norep={1}>Try Crossfit For Free!</_MyPageFreeTrialContentTitle>
                                )}
                            </_MyPageFreeTrialContent>
                        </_MyPageFreeTrialContentContainer>
                    </_MyPageFreeTrialContentLink>
                    {myPageFreeTrialLoading && 
                        <Spinner />
                    }
                </_MyPageSubContainer>
            </_MyPageContainer>
        </>
    )
}