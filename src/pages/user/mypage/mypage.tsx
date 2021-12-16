import { client } from '@/apollo';
import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { clearCookie } from "@/cookie";
import { useMe } from "@/hooks/useMe";
import ModalBase from "@/pages/modal-base";
import { _ToggleButton } from "@/theme/components/_LeaderBoard";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { _MyPageImgContainer, _MyPageContents, _MyPageNoContent, _MyPageListBoxContentContainer, _MyPageListBoxContent, _MyPageSubContainer, _MyPageTabContainer, _MyPageTab, _MyPageImg, _MyPageImgTitle, _MyPageProfileContainer, _MyPageProfileImgContainer, _MyPageProfileImg, _MyPageProfileSpan, _MyPageContainer, _MyPageToggleButton, _MyPageChangePwForm, _MyPageChangePwInput } from "@/theme/components/_MyPage";
import { encryptValue } from "@/util/crypto";
import { editPassword, editPasswordVariables } from "@/__generated__/editPassword";
import { myNamedWodRecords } from "@/__generated__/myNamedWodRecords";
import { myOneRmRecords } from "@/__generated__/myOneRmRecords";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LeaderBoardTab } from "../leader-board/leader-board-tab";
import { LeaderBoardTabContainer } from "../leader-board/leader-board-tab-container";
import { MyPageBoardOfRecord } from "./mypage-board-of-record";
import { MyPageFreeTrial } from "./mypage-free-trial";
import { MyPageHold } from "./mypage-hold";
import { MyPageLeaderBoard } from "./mypage-leader-board";

const EDIT_PASSWORD = gql`
    mutation editPassword($input:EditPasswordInput!) {
        editPassword(input:$input) {
            ok
            error
        }
    }
`;

interface IMyPageChangePwForm {
    currentPw: string;
    changePw: string;
}

export const MyPage = () => {
    const { data:me, loading:meLoading, error:meError } = useMe();
    const [menuFirstState, setMenuFirstState] = useState(1);
    const [changePwToggleState, setChangePwToggleState] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

    const {register, getValues, formState: { errors }, handleSubmit, formState} = useForm<IMyPageChangePwForm>({
        mode:"onChange",
    });

    const onCompleted = (data: editPassword) => {
        const { editPassword:{ ok }, } = data;
        if(ok) {
            handleModalOpen();
        }
    }
    const [editPassword, { data:editPasswordResult, loading }] = useMutation<editPassword, editPasswordVariables>(EDIT_PASSWORD, {
        onCompleted,
    });

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
        client.cache.reset().then(() => {
            clearCookie('authorization');
            location.reload();
        })
        history.push("/");
    };

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

            if(!loading){
                const cryptoCurrentPassword = encryptValue(currentPw);
                const cryptoChangePassword = encryptValue(changePw);
                editPassword({
                    variables: {
                        input: {
                            password:cryptoCurrentPassword,
                            currentPw:cryptoCurrentPassword,
                            changePw:cryptoChangePassword,
                        }
                    },
                },
            )}
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
                                    required: "현재 비밀번호가 적어주세요.",
                                })}
                                name="currentPw"
                                type="password"
                                placeholder="현재 비밀번호"
                                className="input"
                            />
                            {errors.currentPw?.message && (
                                <FormError errorMessage={errors.currentPw?.message} />
                            )}
                            <_MyPageChangePwInput  
                                {...register("changePw", {
                                    required: "새로운 비밀번호를 적어주세요.",
                                })}
                                name="changePw"
                                type="password"
                                placeholder="새로운 비밀번호"
                                className="input"
                            />
                            {errors.changePw?.message && (
                                <FormError errorMessage={errors.changePw?.message} />
                            )}
                            <Button canClick={formState.isValid} loading={loading} actionText={"변경"} />
                            {editPasswordResult?.editPassword.error &&<FormError errorMessage={editPasswordResult?.editPassword.error} />}
                        </_MyPageChangePwForm>
                    )
                }
            </_MyPageProfileContainer>
            <_MyPageContainer>
                <_MyPageSubContainer>
                    <_MyPageTabContainer>
                        <_MyPageTab active={menuFirstState} tabId={1} onClick={()=>handleMenu(1)}>순위</_MyPageTab>
                        <_MyPageTab active={menuFirstState} tabId={2} onClick={()=>handleMenu(2)}>기록</_MyPageTab>
                        <_MyPageTab active={menuFirstState} tabId={3} onClick={()=>handleMenu(3)}>무료체험</_MyPageTab>
                        <_MyPageTab active={menuFirstState} tabId={4} onClick={()=>handleMenu(4)}>일시정지</_MyPageTab>
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
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"다시 로그인해주세요."} modalButtonText={"확인"}> </ModalBase>
            </_MyPageContainer>
        </>
    )
}