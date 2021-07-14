import { ApolloError, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import {Helmet} from "react-helmet-async";
import { useForm, useFormState } from "react-hook-form";
import Head from 'next/head';
import Link from 'next/link';
// import { authTokenVar, isLoggedInVar } from "../apollo";
// import { Button } from "../components/button";
// import { FormError } from "../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../constants";
import nuberLogo from "../images/logo.svg";
// import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import { authTokenVar, isLoggedInVar } from "./api/apolloClient";
import { Button } from "../components/botton";
import { FormError } from "../components/form-error";

const DivStyle = styled.div`
    screen:h-screen;
    flex:auto;
    align-items: center;
`

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

const Login = () => {
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
        <DivStyle>
            <Head>
                <title>Login | Nuber Eats</title>
            </Head>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                {/* <img src={nuberLogo} className="w-52 mb-10" /> */}
                <h4 className="w-full font-medium text-left text-3xl mb-5">Welcome back!</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 mb-5 w-full">
                    <input 
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
                    <input  
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

                    <Button canClick={formState.isValid} loading={loading} actionText={"Log in"} />

                    {loginMutationResult?.login.error &&<FormError errorMessage={loginMutationResult.login.error} />}
                </form>
                <div>
                    New to Nuber? <Link href="/create-account" >Create Account</Link>
                </div>
            </div>
        </DivStyle>
    );
};

export default Login