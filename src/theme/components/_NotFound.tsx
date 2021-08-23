import styled, { css } from 'styled-components';
import { _SubContainer } from "./_Layout"
import { _ButtonCommon } from "./_Button";
import { Link } from 'react-router-dom';

export const _NotFoundContainer = styled.div`
    height: 100vh;
    position:relative;
    min-width:300px;
`

export const __NotFoundSubContainer = styled(_SubContainer)`
    width:auto;
    padding:0;
`;

export const _NotFoundTitle = styled.div`
    text-align:center;
    font-size:1.5em;
    margin-bottom:20px;
`;

export const _NotFoundLink = styled(Link)`
    color:${({ theme }) => theme.mode.primaryText};
    font-size: 1.125rem;
    font-weight: 500;
    font-weight: bold;
    outline: none;
    border: none;
    margin:2rem;
    height:4rem;
`;