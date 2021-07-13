
import { validate } from "graphql";
import React from "react";
import Head from 'next/head';
import Link from 'next/link';

// import { NotFound } from "../pages/404";
// import { CreateAccount } from "../pages/create-account";
// import { Login } from "../pages/login";


export const LoggedOutRouter = () =>  {
    return( 
        <ul>
            <li>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </li>
            <li>
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </li>
        </ul>
        // <Route>
        //     <NotFound />
        // </Route>
    );
}