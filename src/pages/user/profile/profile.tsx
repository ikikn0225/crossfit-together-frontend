import { useMe } from "@/hooks/useMe";
import ModalBase from "@/pages/modal-base";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { _MyPageImgContainer, _MyPageContents, _MyPageNoContent, _MyPageListBoxContentContainer, _MyPageListBoxContent, _MyPageSubContainer, _MyPageTabContainer, _MyPageTab, _MyPageImg, _MyPageImgTitle, _MyPageProfileContainer, _MyPageProfileImgContainer, _MyPageProfileImg, _MyPageProfileSpan, _MyPageContainer, _MyPageToggleButton, _MyPageChangePwForm, _MyPageChangePwInput } from "@/theme/components/_MyPage";
import { deleteNotice, deleteNoticeVariables } from "@/__generated__/deleteNotice";
import { UserRole } from "@/__generated__/globalTypes";
import { notice, noticeVariables } from "@/__generated__/notice";
import { userProfile, userProfileVariables } from "@/__generated__/userProfile";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import { MyPageBoardOfRecord } from "../mypage/mypage-board-of-record";
import { MyPageFreeTrial } from "../mypage/mypage-free-trial";
import { MyPageHold } from "../mypage/mypage-hold";
import { MyPageLeaderBoard } from "../mypage/mypage-leader-board";

export const USER_PROFILE = gql`
    query userProfile($userId: Float!) {
        userProfile(userId: $userId) {
            error
            ok
            user {
                id
                email
                affiliatedBoxId
                name
                profileImg
                role
                verified
            }
        }
    }
`;

interface IParams {
    id: string;
}

export const Profile = () => {
    const { data:me, loading:meLoading, error:meError } = useMe();
    const {id} = useParams<IParams>();
    const [menuFirstState, setMenuFirstState] = useState(1);

    const { data:profile, loading:profileLoading, error:profileError } = useQuery<userProfile, userProfileVariables>( USER_PROFILE, {
            variables: {
                userId:+id,
            },
        }
    );
    
    const handleMenu = (flag:number) => {
        if(flag == 1)      { setMenuFirstState(1); } 
        else if(flag == 2) { setMenuFirstState(2); }
        else if(flag == 3) { setMenuFirstState(3); }
        else               { setMenuFirstState(4); }
    }

    if (!profile?.userProfile.user || profileLoading || profileError) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }
    
    return (
        <>
            <Helmet>
                <title>Profile | CrossfiTogether</title>
            </Helmet>
            <_MyPageImgContainer>
                <_MyPageImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_MyPageImg> 
                <_MyPageImgTitle></_MyPageImgTitle>
            </_MyPageImgContainer>
            <_MyPageProfileContainer>
                <_MyPageProfileImgContainer>
                    <_MyPageProfileImg img={profile?.userProfile.user?.profileImg}></_MyPageProfileImg>
                </_MyPageProfileImgContainer>
                <_MyPageProfileSpan>{profile?.userProfile.user?.name}</_MyPageProfileSpan>
                <_MyPageProfileSpan>{profile?.userProfile.user?.email}</_MyPageProfileSpan>
            </_MyPageProfileContainer>
            <_MyPageContainer>
                <_MyPageSubContainer>
                    <_MyPageTabContainer>
                        <_MyPageTab active={menuFirstState} tabId={1} onClick={()=>handleMenu(1)}>기록</_MyPageTab>
                        <_MyPageTab active={menuFirstState} tabId={2} onClick={()=>handleMenu(2)}>순위</_MyPageTab>
                        <_MyPageTab active={menuFirstState} tabId={3} onClick={()=>handleMenu(3)}>체험</_MyPageTab>
                        <_MyPageTab active={menuFirstState} tabId={4} onClick={()=>handleMenu(4)}>정지</_MyPageTab>
                    </_MyPageTabContainer>
                    <_MyPageContents>
                        {menuFirstState == 1
                        && (
                            <MyPageBoardOfRecord me={profile?.userProfile.user} />
                        )}
                        {menuFirstState == 2
                        && (
                            <MyPageLeaderBoard />
                        )}
                        {menuFirstState == 3
                        && (
                            <MyPageFreeTrial me={profile?.userProfile.user} />
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