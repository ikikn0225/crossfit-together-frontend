import React, { useEffect } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Login } from "../pages/login";
import { CreateAccount } from "../pages/create-account";
import { NotFound } from "../pages/404";

interface ILoggedOutRouterTheme {
    themeMode: string;
}

export const LoggedOutRouter = ({themeMode}:ILoggedOutRouterTheme) => {

    return( 
        <Router>
            <Switch>
                <Route path="/create-account">
                    <CreateAccount />
                </Route>
                <Route path="/" exact>
                    <Login themeMode={themeMode}/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}