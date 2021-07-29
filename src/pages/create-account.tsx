import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { createAccountMutation, createAccountMutationVariables } from "@/__generated__/createAccountMutation";
import { AffiliatedBoxList } from "@/__generated__/globalTypes";
import { UserRole } from "@/__generated__/globalTypes";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BigContainer, FormStyle, InputStyle, SmallContainer } from "./login";

const FileInputStyle = styled(InputStyle)`
    height:auto;
`;

const SelectStyle = styled.select`
    width:100%;
    height: 2.25rem;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 2px;
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
    myBox:  AffiliatedBoxList;
}

interface ILoginTheme {
    themeMode: string;
}

export const CreateAccount = ({themeMode}:ILoginTheme) => {
    const { register, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<ICreateAccountForm>({
        mode:"onChange",
        defaultValues: {
            role: UserRole.Crossfiter,
        }
    });
    const [imageUrl, setImageUrl] = useState("");
    const history = useHistory();
    const onCompleted = (data: createAccountMutation) => {
        // const { createAccountMutation: {  } } = data;
    }
    const [createAccountMutation, { loading, data:createAccountMutationResult }] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
        onCompleted,   
    });
    const onSubmit = async() => {
        if(!loading) {
            try {
                const { name, email, password, role, file, myBox } = getValues();
                const actualFile = file[0];
                const formBody = new FormData();
                formBody.append("file", actualFile);
                const { url: profileImg } = await (
                    await fetch("http://localhost:4000/uploads/", {
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
            } catch (e) {
                console.log(e.response.data);
            }
        }
    }
    return (
        <BigContainer>
            <Helmet>
                <title>Create Account | CrossfiTogether</title>
            </Helmet>
            <SmallContainer>
                {themeMode === "light" 
                    ? <img src="../../public/images/logo_white.jpg" />
                    : <img src="../../public/images/logo_black.jpg" />
                }
                <FormStyle  onSubmit={handleSubmit(onSubmit)}>
                    <InputStyle 
                        {...register("name", {
                            required: "Name is required",
                        })}
                        name="name"
                        placeholder="Name"
                        className="input"
                    />
                    {errors.name?.message && (  
                        <FormError errorMessage={errors.name?.message} />
                    )}
                    <InputStyle
                        {...register("email", {
                            required: "Email is required",
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="input"
                    />
                    {errors.email?.message && (  
                        <FormError errorMessage={errors.email?.message} />
                    )}
                    {errors.email?.type === "pattern" && (  
                        <FormError errorMessage={"Please enter a valid email"} />
                    )}
                    <InputStyle  
                        {...register("password", {
                            required: "Password is required",
                        })}
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input"
                    />
                    {errors.password?.message && (
                        <FormError errorMessage={errors.password?.message} />
                    )}
                    {errors.password?.type === "minLength" && (
                        <FormError errorMessage="Password must be more than 10 chars" />
                    )}
                    <SelectStyle {...register("role", {
                            required: true,
                        })}
                        name="role"
                        className="input">
                        {Object.keys(UserRole).map((role, index) => (<option key={index}>{role}</option>))}
                    </SelectStyle>
                    <SelectStyle {...register("myBox", {
                            required: true,
                        })}
                        name="myBox"
                        className="input">
                        {Object.keys(AffiliatedBoxList).map((box, index) => (<option key={index}>{box}</option>))}
                    </SelectStyle>
                    <FileInputStyle 
                        {...register("file", {
                            required: "file is required",
                        })}
                        type="file"
                        accept="image/*"
                    />
                    <Button canClick={formState.isValid} loading={loading} actionText={"Create Account"} />
                    {createAccountMutationResult?.createAccount.error && <FormError errorMessage={createAccountMutationResult.createAccount.error}/>}
                </FormStyle>
                <div>
                    Alreay have an account? <Link to="/" className=" text-green-600 hover:underline" > Log in now</Link>
                </div>
            </SmallContainer>
        </BigContainer>
    )
};