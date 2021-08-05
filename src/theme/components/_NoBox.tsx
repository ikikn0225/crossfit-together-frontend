import styled, { css } from 'styled-components';
import { _SubContainer } from "../components/_Layout"
import { _ButtonCommon } from "../../theme/components/_Button";

export const _NoBoxContainer = styled.div`
    height: 100vh;
    position:relative;
    min-width:300px;
`

export const __NoBoxSubContainer = styled(_SubContainer)`
    width:auto;
    padding:0;
`;

export const _NoBoxSpan = styled.div`
    text-align:center;
`;

export const _NoBoxCreateAffiliatedBoxButton = styled(_ButtonCommon)`
    color:#000;
    margin:2rem;
    height:4rem;
`;