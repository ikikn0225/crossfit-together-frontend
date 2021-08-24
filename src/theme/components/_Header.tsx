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

interface IOpen {
    open:boolean;
}

export const _HeaderUl = styled.ul<IOpen>`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 1220px) {
        flex-flow: column nowrap;
        background-color: rgba(51, 51, 51, 0.9);
        position: fixed;
        transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
        top: 0;
        right: 0;
        height: 100vh;
        width: 300px;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;
}`;

export const _HeaderLl = styled.li`
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
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

export const _HeaderLink = styled(Link)`
    padding: 18px 10px;
    color: #fff;
    text-decoration: none;
`;

export const _HeaderLogOutButton = styled.li`
    padding: 18px 10px;
    color: #fff;
    text-decoration: none;
    cursor:pointer;
`;

// export const _HeaderLogOutButton = styled(_ButtonCommon) `
//     display:none;
//     @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
//         display:block; 
//         font-size: 1rem;
//         height: 1.25rem;
//         color:black;
//         border-radius:1px;
//     }
// `;
