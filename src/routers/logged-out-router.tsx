
import { validate } from "graphql";
import React from "react";
import Head from 'next/head';
import Link from 'next/link';
// import { NotFound } from "../pages/404";
// import { CreateAccount } from "../pages/create-account";
// import { Login } from "../pages/login";


export const LoggedOutRouter = () =>  {
    return( 
        <Link href="/about">
            <a>About</a>
        </Link>
        // <Route path="/" exact>
        //     <Login />
        // </Route>
        // <Route>
        //     <NotFound />
        // </Route>
    );
}