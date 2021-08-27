import { Header } from "@/components/header";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import styled from 'styled-components';
import { useApolloClient } from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "@/constants";
import { NotFound } from "@/pages/404";
import { _Container, _SubContainer } from "../theme/components/_Layout"
import { NoBox } from "@/pages/user/no-box";
import { CreateAffiliatedBox } from "@/pages/coach/create-affiliated-box";
import { Main } from "@/pages/user/main";
import { clearCookie } from "@/cookie";
import { ConfirmEmail } from "@/pages/confirm-email";
import { Wod } from "@/pages/user/wod";
import { FreeTrial } from "@/pages/user/free-trial";
import { Hold } from "@/pages/user/hold";
import { BoardOfRecord } from "@/pages/user/board-of-record";
import { LeaderBoard } from "@/pages/user/leader-board";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { CreateWod } from "@/pages/user/create-wod";

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
    },
    {
        path:"/wod",
        component:<Wod/>
    },
    {
        path:"/create-wod",
        component:<CreateWod/>
    },
    {
        path:"/leader-board",
        component:<LeaderBoard/>
    },
    {
        path:"/board-of-record",
        component:<BoardOfRecord/>
    },
    {
        path:"/hold",
        component:<Hold/>
    },
    {
        path:"/free-trial",
        component:<FreeTrial/>
    },
    {
        path:"/confirm",
        component: <ConfirmEmail />
    }
];

const commonRoutes = [
    {
        path:"/confirm",
        component: <ConfirmEmail />
    }
];

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
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
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
                    {commonRoutes.map((route) => (
                        <Route key={route.path} path={route.path}>
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