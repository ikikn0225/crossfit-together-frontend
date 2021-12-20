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
import { loginMutation, loginMutationVariables } from "@/__generated__/loginMutation";
import { _Container, _SubContainer } from "../theme/components/_Layout"
import { _LoginLogoImage, _LoginForm, _LoginInput, _LoginExtra, _LoginCreateAccountLink } from "../theme/components/_Login"
import { setCookie } from "@/cookie";
import { encryptValue } from "@/util/crypto";
import { useCallback } from "react";

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
            // localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            setCookie(LOCALSTORAGE_TOKEN, `Bearer ${token}`, {path: '/', expires: new Date(Date.now()+(28800000))});
            authTokenVar(`Bearer ${token}`);
            isLoggedInVar(true);
        }
    }
    const [loginMutation, { data:loginMutationResult, loading }] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted,
    });
    const onSubmit = useCallback((values: any) => {
        if(!loading){
            const cryptoPassword = encryptValue(values.password);
            loginMutation({
                variables: {
                    loginInput: {
                        email:values.email,
                        password:cryptoPassword,
                    }
                },
            },
        )}
    }, []); 
    return (
        <_Container>
            <Helmet>
                <title>Login | CrossfiTogether</title>
            </Helmet>
            <_SubContainer>
                {/* {themeMode === "light" 
                    ? <_LoginLogoImage src="../../public/images/logo_white_fake.jpg" />
                    : <_LoginLogoImage src="https://crossfitogether0225.s3.amazonaws.com/logo_black.jpg" />
                } */}
                {/* <_LoginLogoImage src="https://crossfitogether0225.s3.amazonaws.com/logo_black.jpg" /> */}
                <_LoginForm  onSubmit={handleSubmit(onSubmit)}>
                    <_LoginInput 
                        {...register("email", {
                            required: "이메일을 적어주세요.",
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
                    <_LoginInput  
                        {...register("password", {
                            required: "비밀번호를 적어주세요.",
                        })}
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        className="input"
                    />
                    {errors.password?.message && (
                        <FormError errorMessage={errors.password?.message} />
                    )}
                    <Button canClick={formState.isValid} loading={loading} actionText={"로그인"}></Button>
                    {loginMutationResult?.login.error &&<FormError errorMessage={loginMutationResult.login.error} />}
                </_LoginForm>
                <_LoginExtra>
                    <div>
                        처음이신가요? <_LoginCreateAccountLink to="/create-account" >회원가입</_LoginCreateAccountLink>
                    </div>
                </_LoginExtra>
            </_SubContainer>
        </_Container>
    );
};
