import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { createAccountMutation, createAccountMutationVariables } from "@/__generated__/createAccountMutation";
import { allAffiliatedBoxesQuery } from "@/__generated__/allAffiliatedBoxesQuery"; 
import { UserRole } from "@/__generated__/globalTypes";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { _Container, _SubContainer } from "../theme/components/_Layout";
import { _CreateAccountForm ,_CreateAccountInput ,_CreateAccountExtra ,_CreateAccountFileInput ,_CreateAccountSelect, _CreateAccountLoginLink, _CreateAccountFileLabel } from "../theme/components/_CreateAccount";
import ModalBase from "./modal-base";

export const ALL_AFFILIATED_BOXES = gql`
    query allAffiliatedBoxesQuery {
        allAffiliatedBoxes {
            ok
            error
            allAffiliatedBoxes {
                name
            }
        }
    }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input:$createAccountInput) {
            ok
            error
        }
    }
`;

interface ICreateAccountForm {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    file: FileList;
    myBox?: string;
}

interface ILoginTheme {
    themeMode: string;
}

export const CreateAccount = ({themeMode}:ILoginTheme) => {
    const { register, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<ICreateAccountForm>({
        mode:"onChange",
        defaultValues: {
            role: UserRole.Coach,
        }
    });
    const [file, setFile] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [roleStatus, setRoleStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
        history.push("/");
    };

    const onCompleted = (data: createAccountMutation) => {
        const { createAccount: { ok, error } } = data;
        if(ok) {
            setUploading(false);
            handleModalOpen();
        }
    }
    const [createAccountMutation, { loading, data:createAccountMutationResult }] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
        onCompleted,   
    });
    const { data:boxes } = useQuery<allAffiliatedBoxesQuery>(ALL_AFFILIATED_BOXES);

    const changeInput = (e:any) => {
        setFile(e.target.files[0]);
    }

    const onSubmit = async() => {
        try {
            const { name, email, password, role, myBox } = getValues();
            
            const actualFile = file;
            const formBody = new FormData();
            formBody.append("file", actualFile);
            let uri:string;
            process.env.NODE_ENV === "production"
            ? uri='https://crossfitogether0225.herokuapp.com/uploads'
            : uri='http://localhost:4000/uploads'
            const { url: profileImg } = await (
                await fetch(uri, {
                    method:"POST",
                    body:formBody,
                })
            ).json();
            
            setImageUrl(profileImg);
            
            createAccountMutation({
                variables: {
                    createAccountInput: {
                        name,
                        profileImg,
                        email,
                        password,
                        role,
                        myBox
                    }
                }
            })
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    return (
        <_Container>
            <Helmet>
                <title>Create Account | CrossfiTogether</title>
            </Helmet>
            <_SubContainer>
                {/* {themeMode === "light" 
                    ? <img src="../../public/images/logo_white_fake.jpg" />
                    : <img src="../../public/images/logo_black_fake.jpg" />
                } */}
                <img src="https://crossfitogether0225.s3.amazonaws.com/logo_black.jpg" />
                <_CreateAccountForm  onSubmit={handleSubmit(onSubmit)}>
                    <_CreateAccountInput 
                        {...register("name", {
                            required: "이름을 적어주세요",
                        })}
                        name="name"
                        placeholder="이름"
                        className="input"
                    />
                    {errors.name?.message && (  
                        <FormError errorMessage={errors.name?.message} />
                    )}
                    <_CreateAccountInput
                        {...register("email", {
                            required: "이메일을 적어주세요",
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        name="email"
                        type="email"
                        placeholder="이메일"
                        className="input"
                    />
                    {errors.email?.message && (  
                        <FormError errorMessage={errors.email?.message} />
                    )}
                    {errors.email?.type === "pattern" && (  
                        <FormError errorMessage={"Please enter a valid email"} />
                    )}
                    <_CreateAccountInput  
                        {...register("password", {
                            required: "비밀번호를 적어주세요",
                        })}
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        className="input"
                    />
                    {errors.password?.message && (
                        <FormError errorMessage={errors.password?.message} />
                    )}
                    {errors.password?.type === "minLength" && (
                        <FormError errorMessage="10자이상 적어주세요" />
                    )}
                    <_CreateAccountSelect 
                        {...register("role", {
                            required: true,
                        })}
                        name="role"
                        className="input"
                        onChange={e => setRoleStatus(e.target.value)}
                        value={roleStatus}
                        >
                        {Object.keys(UserRole).map((role, index) => (<option key={index} value={role}>{role}</option>))}
                    </_CreateAccountSelect>
                    {roleStatus === UserRole.Crossfiter 
                    && (
                        <_CreateAccountSelect 
                            {...register("myBox", {
                                required: true,
                            })}
                            name="myBox"
                            className="input"
                            >
                            {boxes?.allAffiliatedBoxes.allAffiliatedBoxes?.length !== 0 
                            ? (
                                boxes?.allAffiliatedBoxes.allAffiliatedBoxes?.map((box:any, index:any) => (<option key={index} value={box.name}>{box.name}</option>))
                            )
                            : (
                                <option value="" selected disabled>No Box here</option>  
                            )}
                        </_CreateAccountSelect>
                    )}
                    {errors.myBox?.message && (
                        <FormError errorMessage={errors.myBox?.message} />
                    )}
                    <_CreateAccountFileInput 
                        {...register("file", {
                            required: "프로필 이미지를 넣어주세요",
                        })}
                        type="file"
                        accept="image/*"
                        onChange={changeInput}
                        id="input-file"
                    />
                    <_CreateAccountFileLabel htmlFor="input-file"> 프로필 사진 선택하기 </_CreateAccountFileLabel>
                    <img src={file? URL.createObjectURL(file) : undefined} id="preview"/>
                    {errors.file?.message && (
                        <FormError errorMessage={errors.file?.message} />
                    )}
                    <Button canClick={formState.isValid} loading={loading} actionText={"회원가입하기"} />
                    {createAccountMutationResult?.createAccount.error && <FormError errorMessage={createAccountMutationResult.createAccount.error}/>}
                </_CreateAccountForm>
                <_CreateAccountExtra>
                    <div>
                        이미 회원가입 하셨나요? <_CreateAccountLoginLink to="/" > 로그인하기</_CreateAccountLoginLink>
                    </div>
                </_CreateAccountExtra>
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"CrossfiTogether에 오신걸 환영합니다."} modalButtonText={"확인"}> </ModalBase>
            </_SubContainer>
        </_Container>
    )
};