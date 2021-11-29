import { _MyPageContainer, _MyPageLeaderBoardContentContainer, _MyPageListBoxContent, _MyPageListBoxContentContainer, _MyPageNoContent, _MyPageSubContainer, _MyPageTitle, _MyPageWodDateSpan, _MyPageFreeTrialContentContainer, _MyPageFreeTrialContent, _MyPageFreeTrialContentTitle, _MyPageFreeTrialContentDate } from "@/theme/components/_MyPage";
import { myNamedWodRecords } from "@/__generated__/myNamedWodRecords";
import { myOneRmRecords } from "@/__generated__/myOneRmRecords";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { LeaderBoardTabContainer } from "../leader-board/leader-board-tab-container";
import gql from "graphql-tag";
import { wodList } from "@/__generated__/wodList";
import { IWodEdge, WOD_LIST } from "../wods";
import { Wod } from "@/components/wod";
import { BoardOfRecord } from "@/components/board-of-record";
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
            <_MyPageTitle>Free Trial</_MyPageTitle>
            {/* <_MyPageContainer>
                <_MyPageSubContainer> */}
                    <_MyPageFreeTrialContentContainer>
                        <_MyPageFreeTrialContent>
                            {myPageFreeTrial?.myFreeTrial.freeTrial !== null
                            ? (
                                <>
                                    <_MyPageFreeTrialContentTitle>You Have Already Booked At</_MyPageFreeTrialContentTitle>
                                    <_MyPageFreeTrialContentDate>{new Date(myPageFreeTrial?.myFreeTrial?.freeTrial.freeTrialAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} 
                                                &nbsp;({new Date(myPageFreeTrial?.myFreeTrial?.freeTrial.freeTrialAt).toDateString().substring(0, 3)})</_MyPageFreeTrialContentDate>
                                </>
                            )
                            :(
                                <_MyPageFreeTrialContentTitle norep={1}>Try Crossfit For Free!</_MyPageFreeTrialContentTitle> //링크로 FreeTrial 페이지로 이동하기
                            )}
                        </_MyPageFreeTrialContent>
                    </_MyPageFreeTrialContentContainer>
                    {myPageFreeTrialLoading && 
                        <Spinner />
                    }
                {/* </_MyPageSubContainer>
            </_MyPageContainer> */}
        </>
    )
}