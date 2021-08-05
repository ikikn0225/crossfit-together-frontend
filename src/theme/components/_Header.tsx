import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {_ButtonCommon} from "../components/_Button"

export const _HeaderNotVerifyContainer = styled.div`
    padding: 0.75rem;
    background-color:red;
    text-align:center;
    font-size:20px;
    color:white;
`
export const _HeaderContainer = styled.div`
    width: 100%;
    padding:1rem 1.25rem;
    background-color: ${({ theme }) => theme.mode.mainBackground};
    display:flex;
    justify-content: space-between;
    align-items: center;
`;

export const _HeaderImgContainer = styled.header`
    width: 9rem;
`;

export const _HeaderButton = styled(_ButtonCommon) `
    font-size: 1rem;
    height: 1.25rem;
    color:black;
    border-radius:1px;
`;
