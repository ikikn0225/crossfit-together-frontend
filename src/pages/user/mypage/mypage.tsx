import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { useMe } from "@/hooks/useMe";
import { _ToggleButton } from "@/theme/components/_LeaderBoard";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { _MyPageImgContainer, _MyPageContents, _MyPageNoContent, _MyPageListBoxContentContainer, _MyPageListBoxContent, _MyPageSubContainer, _MyPageTabContainer, _MyPageTab, _MyPageImg, _MyPageImgTitle, _MyPageProfileContainer, _MyPageProfileImgContainer, _MyPageProfileImg, _MyPageProfileSpan, _MyPageContainer, _MyPageToggleButton, _MyPageChangePwForm, _MyPageChangePwInput } from "@/theme/components/_MyPage";
import { myNamedWodRecords } from "@/__generated__/myNamedWodRecords";
import { myOneRmRecords } from "@/__generated__/myOneRmRecords";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { LeaderBoardTab } from "../leader-board/leader-board-tab";
import { LeaderBoardTabContainer } from "../leader-board/leader-board-tab-container";
import { MyPageBoardOfRecord } from "./mypage-board-of-record";
import { MyPageFreeTrial } from "./mypage-free-trial";
import { MyPageHold } from "./mypage-hold";
import { MyPageLeaderBoard } from "./mypage-leader-board";

interface IMyPageChangePwForm {
    currentPw: string;
    changePw: string;
}

export const MyPage = () => {
    const { data:me, loading:meLoading, error:meError } = useMe();
    const [menuFirstState, setMenuFirstState] = useState(1);
    const [changePwToggleState, setChangePwToggleState] = useState(0);
    const [uploading, setUploading] = useState(false);

    const {register, getValues, formState: { errors }, handleSubmit, formState} = useForm<IMyPageChangePwForm>({
        mode:"onChange",
    });

    const handleMenu = (flag:number) => {
        if(flag == 1)      { setMenuFirstState(1); } 
        else if(flag == 2) { setMenuFirstState(2); }
        else if(flag == 3) { setMenuFirstState(3); }
        else               { setMenuFirstState(4); }
    }

    const handlePwToggle = (toggle:number) => {
        if(toggle == 0)       setChangePwToggleState(1);
        else if(toggle == 1)  setChangePwToggleState(0);
    }
    
    if (!me || meLoading || meError) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }

    const onSubmit = async() => {
        try {
            const { currentPw, changePw } = getValues();
            
            // createAffiliatedBoxMutation({
            //     variables: {
            //         createAffiliatedBoxInput: {
            //             name,
            //             address,
            //             coverImg
            //         }
            //     }
            // })
        } catch (e:any) {
            console.log(e.response.data);
        }
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
                <_MyPageToggleButton onClick={()=>handlePwToggle(changePwToggleState)} >비밀번호 변경</_MyPageToggleButton>
                {changePwToggleState == 1
                    &&(
                        <_MyPageChangePwForm onSubmit={handleSubmit(onSubmit)} changePwToggleState={changePwToggleState}>
                            <_MyPageChangePwInput  
                                {...register("currentPw", {
                                    required: "현재 비밀번호가 다릅니다.",
                                })}
                                name="currentPw"
                                type="currentPw"
                                placeholder="현재 비밀번호"
                                className="input"
                            />
                            {errors.currentPw?.message && (
                                <FormError errorMessage={errors.currentPw?.message} />
                            )}
                            <_MyPageChangePwInput  
                                {...register("changePw", {
                                    required: "새로운 비밀번호가 다릅니다.",
                                })}
                                name="changePw"
                                type="changePw"
                                placeholder="새로운 비밀번호"
                                className="input"
                            />
                            {errors.changePw?.message && (
                                <FormError errorMessage={errors.changePw?.message} />
                            )}
                            {/* <Button canClick={formState.isValid} loading={loading} actionText={"변경"} /> */}
                        </_MyPageChangePwForm>
                    )
                }
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