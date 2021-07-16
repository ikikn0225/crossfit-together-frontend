import { Header } from "@/components/header";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import styled from 'styled-components';

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
    const { data, loading, error } = useMe();
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
            <h1>{data.me.email}</h1>
        </Router>
    );
}