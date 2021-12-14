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
import { Wods } from "@/pages/user/wod/wods";
import { FreeTrial } from "@/pages/user/free-trial/free-trial";
import { Hold } from "@/pages/user/hold/hold";
import { BoardOfRecords } from "@/pages/user/board-of-record/board-of-records";
import { LeaderBoard } from "@/pages/user/leader-board/leader-board";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { CreateWod } from "@/pages/coach/create-wod";
import { EditWod } from "@/pages/coach/edit-wod";
import { MyPage } from "@/pages/user/mypage/mypage";
import { TimeTable } from "@/pages/user/time-table";
import { Notices } from "@/pages/user/notice/notices";
import { CreateNotice } from "@/pages/user/notice/create-notice";
import { NoticeDetail } from "@/pages/user/notice/notice-detail";

interface ILoggedInRouterTheme {
    themeMode: string;
}

const noAffiliatedBoxRoutes = [
    { path:"/", component:<NoBox/> },
    { path:"/create-affiliated-box", component:<CreateAffiliatedBox/> }
];

const affiliatedBoxRoutes = [
    { path:"/", component:<Main /> },
    { path:"/wods", component:<Wods/> },
    { path:"/create-wod", component:<CreateWod/> },
    { path:"/edit-wod/:id", component:<EditWod/> },
    { path:"/leader-board", component:<LeaderBoard/> },
    { path:"/board-of-record", component:<BoardOfRecords/> },
    { path:"/hold", component:<Hold/> },
    { path:"/free-trial", component:<FreeTrial/> },
    { path:"/confirm", component: <ConfirmEmail /> },
    { path:"/wods/:slug", component: <Wods/> },
    { path:"/mypage", component: <MyPage/> },
    { path:"/time-table", component: <TimeTable/> },
    { path:"/notices", component: <Notices/> },
    { path:"/create-notice", component: <CreateNotice/> },
    { path:"/notice/:id", component:<NoticeDetail/> },
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