import { Header } from "@/components/header";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import styled from 'styled-components';
import { useApolloClient } from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "@/constants";
import { NotFound } from "@/pages/404";

const LoadingStyle = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingSpanStyle = styled.span`
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.75rem;
    letter-spacing: 0.025em;
`;

export const LoggedInRouter = () => {
    const { client, data, loading, error } = useMe();
    const logOutClick = () => {

        client.cache.reset().then(() => {
            localStorage.setItem(LOCALSTORAGE_TOKEN, '');
            location.reload();
        })
    }
    if (!data || loading || error) {
        return (
            <LoadingStyle>
                <LoadingSpanStyle>Loading...</LoadingSpanStyle>
            </LoadingStyle>
        );
    }
    return (
        <Router>
            <Header />
            <Switch>
                <h1>{data.me.email}</h1>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}