import { Header } from "@/components/header";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import styled from 'styled-components';
import { useApolloClient } from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "@/constants";
import { NotFound } from "@/pages/404";
import { _Container, _SubContainer } from "../theme/components/_Layout"
import { UserRole } from "@/__generated__/globalTypes";
import { NoBox } from "@/pages/no-box";
import { CreateAffiliatedBox } from "@/pages/coach/create-affiliated-box";
import { Main } from "@/pages/main";
import { clearCookie } from "@/cookie";

export const LoadingStyle = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoadingSpanStyle = styled.span`
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.75rem;
    letter-spacing: 0.025em;
`;

interface ILoggedInRouterTheme {
    themeMode: string;
}

const noAffiliatedBoxRoutes = [
    {
        path:"/",
        component:<NoBox/>
    },
    {
        path:"/create-affiliated-box",
        component:<CreateAffiliatedBox/>
    }
];

const affiliatedBoxRoutes = [
    {
        path:"/",
        component:<Main />
    }
]

export const LoggedInRouter = ({themeMode}:ILoggedInRouterTheme) => {
    const { data, loading, error, client } = useMe();
    const history = useHistory();
    
    if(!data && error) {
        client.cache.reset().then(() => {
            clearCookie('authorization');
            location.reload();
        })
        history.push("/");
    }

    if (!data || loading) {
        return (
            <LoadingStyle>
                <LoadingSpanStyle>Loading...</LoadingSpanStyle>
            </LoadingStyle>
        );
    }
    return (
        <_Container>
            <Router>
                <Header />
                <Switch>
                    {!data.me.affiliatedBoxId && noAffiliatedBoxRoutes.map((route) => (
                        <Route exact key={route.path} path={route.path}>
                            {route.component}
                        </Route>
                    ))}
                    {data.me.affiliatedBoxId && affiliatedBoxRoutes.map((route) => (
                        <Route exact key={route.path} path={route.path}>
                            {route.component}
                        </Route>
                    ))}
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </_Container>
    );
}