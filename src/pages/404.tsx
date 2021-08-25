import { _NotFoundLink, _NotFoundTitle, __NotFoundSubContainer } from "@/theme/components/_NotFound";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const NotFound = () => (
    <__NotFoundSubContainer>
        <Helmet>
            <title>Not Found | CrossfiTogether</title>
        </Helmet>
        <_NotFoundTitle>
            <h2>Page Not Found.</h2>    
        </_NotFoundTitle>
        <_NotFoundLink to="/">Go back home</_NotFoundLink>
    </__NotFoundSubContainer>
);