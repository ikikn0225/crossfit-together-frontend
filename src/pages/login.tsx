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
// import logo_white from "../../public/images/logo_white.jpg";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import styled from "@emotion/styled";

const BigContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const SmallContainer = styled.div`
    width: 100%;
    max-width: 640px;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const ImgStyle = styled.img`
    width: 13rem;
    margin: 2.5rem;
`

const FormStyle = styled.form`
    display:grid;
    width: 100%;
    gap: 0.75rem;
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

<<<<<<< HEAD
export const Login = () => {
=======
const Login = () => {
>>>>>>> 8e111242616cba49ca9e864e5e451ddadb972a39
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
<<<<<<< HEAD
        <BigContainer>
            <Helmet>
                <title>Login | CrossfiTogether</title>
            </Helmet>
            <SmallContainer>
                <img src="../../public/images/ikikn.jpg" />
                <FormStyle>
=======
        <DivStyle>
            <Head>
                <title>Login | Nuber Eats</title>
            </Head>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                {/* <img src={nuberLogo} className="w-52 mb-10" /> */}
                <h4 className="w-full font-medium text-left text-3xl mb-5">Welcome back!</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 mb-5 w-full">
>>>>>>> 8e111242616cba49ca9e864e5e451ddadb972a39
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
<<<<<<< HEAD
                    <Button canClick={formState.isValid} loading={loading} actionText={"Log in"} />
                    {loginMutationResult?.login.error &&<FormError errorMessage={loginMutationResult.login.error} />}
                </FormStyle>
                <div>
                    New to Nuber? <Link to="/create-account" className=" text-green-600 hover:underline" >Create Account</Link>
                </div>
            </SmallContainer>
        </BigContainer>
    );
};
=======

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
>>>>>>> 8e111242616cba49ca9e864e5e451ddadb972a39
