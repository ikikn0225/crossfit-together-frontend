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

export const Login = () => {
    const { register, getValues, formState: { errors }, handleSubmit, formState } = useForm<ILoginForm>({
        mode:"onChange",
    });
    const onCompleted = (data: loginMutation) => {
        console.log(data);
        
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
            console.log(email, password);
            
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
                <img src="../../public/images/logol_black_font_white_bg_fake.jpg" />
                <FormStyle  onSubmit={handleSubmit(onSubmit)}>
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
                    <Button canClick={formState.isValid} loading={loading} actionText={"Log in"}></Button>
                    {loginMutationResult?.login.error &&<FormError errorMessage={loginMutationResult.login.error} />}
                </FormStyle>
                <div>
                    New to CrossfiTogether? <Link to="/create-account" className=" text-green-600 hover:underline" >Create Account</Link>
                </div>
            </SmallContainer>
        </BigContainer>
    );
};
