import { ApolloError, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import {Helmet} from "react-helmet-async";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useForm, useFormState } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
// import {logo_white} from "../../public/images/logo_white.jpg";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import styled from "styled-components";

export const BigContainer = styled.div`
    height: 100vh;
    position:relative;
    min-width:300px;
`

export const SmallContainer = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 0 30px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
`
export const ImgStyle = styled.img`
    width: 13rem;
    margin: 2.5rem;
`

export const FormStyle = styled.form`
    display:grid;
    width: 100%;
    gap: 1rem;
`

export const InputStyle = styled.input`
    width:100%;
    height: 2.25rem;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 2px;
`;

export const GuideToExtra = styled.div`
    margin-top: 1rem;
    display:grid;
    width: 100%;
    gap: 1rem;
`;

export const LinkCreateAccount = styled(Link)`
    float:right;
    color:${({ theme }) => theme.mode.primaryText};
`;

export const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input:$loginInput) {
            ok
            token
            error
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
}

interface ILoginTheme {
    themeMode: string;
}

export const Login = ({themeMode}:ILoginTheme) => {
    const { register, getValues, formState: { errors }, handleSubmit, formState } = useForm<ILoginForm>({
        mode:"onChange",
    });
    const onCompleted = (data: loginMutation) => {
        const { login:{ error, ok, token }, } = data;
        if(ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            authTokenVar(token);
            isLoggedInVar(true);
        }
    }
    const [loginMutation, { data:loginMutationResult, loading }] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted,
    });
    const onSubmit = () => {
        if(!loading){
            const { email, password } = getValues();
            loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password,
                    }
                },
            },
        )}
    }; 
    return (
        <BigContainer>
            <Helmet>
                <title>Login | CrossfiTogether</title>
            </Helmet>
            <SmallContainer>
                {themeMode === "light" 
                    ? <img src="../../public/images/logo_white_fake.jpg" />
                    : <img src="../../public/images/logo_black_fake.jpg" />
                }
                <FormStyle  onSubmit={handleSubmit(onSubmit)}>
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
                    <Button canClick={formState.isValid} loading={loading} actionText={"Log in"}></Button>
                    {loginMutationResult?.login.error &&<FormError errorMessage={loginMutationResult.login.error} />}
                </FormStyle>
                <GuideToExtra>
                    <div>
                        New to CrossfiTogether? <LinkCreateAccount to="/create-account" >Create Account</LinkCreateAccount>
                    </div>
                </GuideToExtra>
            </SmallContainer>
        </BigContainer>
    );
};
