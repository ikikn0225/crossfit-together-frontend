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

export const _HeaderLogo = styled.div`
    width: 9rem;
`;

export const _HeaderUl = styled.ul`
    display:none;
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {        
        margin-right: 1rem;
        display: flex;
        justify-content: flex-end;
        flex: 1 0 30%;
    }
`;

export const _HeaderLl = styled.li`
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {     
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        &:after {
            padding-right: 20px;
            padding-left: 20px;
            content: "|";
        }
        &:last-child:after {
            content: "";
        }
    }
`;

export const _HeaderLogOutButton = styled(_ButtonCommon) `
    display:none;
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {    
        display:block; 
        font-size: 1rem;
        height: 1.25rem;
        color:black;
        border-radius:1px;
    }
`;

export const _HeaderMenuAcordion = styled.a`
    float: right;
    display: block;
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        display:none;
    }
`;
