import { useMe } from "@/hooks/useMe";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { _MyPageImgContainer, _MyPageContents, _MyPageNoContent, _MyPageListBoxContentContainer, _MyPageListBoxContent, _MyPageSubContainer, _MyPageTabContainer, _MyPageTab, _MyPageImg, _MyPageImgTitle, _MyPageProfileContainer, _MyPageProfileImgContainer, _MyPageProfileImg, _MyPageProfileSpan, _MyPageContainer } from "@/theme/components/_MyPage";
import { myNamedWodRecords } from "@/__generated__/myNamedWodRecords";
import { myOneRmRecords } from "@/__generated__/myOneRmRecords";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { LeaderBoardTab } from "../leader-board/leader-board-tab";
import { LeaderBoardTabContainer } from "../leader-board/leader-board-tab-container";
import { MyPageBoardOfRecord } from "./mypage-board-of-record";
import { MyPageFreeTrial } from "./mypage-free-trial";
import { MyPageHold } from "./mypage-hold";
import { MyPageLeaderBoard } from "./mypage-leader-board";


export const MyPage = () => {
    const { data:me, loading:meLoading, error:meError } = useMe();
    const [menuFirstState, setMenuFirstState] = useState(1);

    const handleMenu = (flag:number) => {
        if(flag == 1)      { setMenuFirstState(1); } 
        else if(flag == 2) { setMenuFirstState(2); }
        else if(flag == 3) { setMenuFirstState(3); }
        else               { setMenuFirstState(4); }
    }
    
    if (!me || meLoading || meError) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }

    return (
        <>
            <Helmet>
                <title>MY PAGE | CrossfiTogether</title>
            </Helmet>
            <_MyPageImgContainer>
                <_MyPageImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_MyPageImg> 
                <_MyPageImgTitle></_MyPageImgTitle>
            </_MyPageImgContainer>
            <_MyPageProfileContainer>
                <_MyPageProfileImgContainer>
                    <_MyPageProfileImg img={me?.me.profileImg?me?.me.profileImg:"https://crossfitogether0225.s3.amazonaws.com/1637884117442Crossfit_ZEST.png"}></_MyPageProfileImg>
                </_MyPageProfileImgContainer>
                <_MyPageProfileSpan>{me?.me.name}</_MyPageProfileSpan>
                <_MyPageProfileSpan>{me?.me.email}</_MyPageProfileSpan>
            </_MyPageProfileContainer>
            <_MyPageContainer>
                <_MyPageSubContainer>
                    <_MyPageTabContainer>
                        <_MyPageTab active={menuFirstState} tabId={1} onClick={()=>handleMenu(1)}>LB</_MyPageTab>
                        <_MyPageTab active={menuFirstState} tabId={2} onClick={()=>handleMenu(2)}>BoR</_MyPageTab>
                        <_MyPageTab active={menuFirstState} tabId={3} onClick={()=>handleMenu(3)}>FT</_MyPageTab>
                        <_MyPageTab active={menuFirstState} tabId={4} onClick={()=>handleMenu(4)}>Hold</_MyPageTab>
                    </_MyPageTabContainer>
                    <_MyPageContents>
                        {menuFirstState == 1
                        && (
                            <MyPageLeaderBoard />
                        )}
                        {menuFirstState == 2
                        && (
                            <MyPageBoardOfRecord me={me?.me} />
                        )}
                        {menuFirstState == 3
                        && (
                            <MyPageFreeTrial me={me?.me} />
                        )}
                        {menuFirstState == 4
                        && (
                            <MyPageHold />
                        )}
                    </_MyPageContents>
                </_MyPageSubContainer>
            </_MyPageContainer>
        </>
    )
}