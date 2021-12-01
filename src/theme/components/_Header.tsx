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

export const _HeaderLogo = styled(Link)`
`;

export const _HeaderNav = styled.nav`
    width: 100%;
    height: 70px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    .logo {
        padding: 15px 0;
        width: 13rem;
    }
`

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
        background-color: rgba(51, 51, 51);
        opacity:0.9;
        position: fixed;
        transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
        top: 0;
        right: 0;
        height: 100vh;
        width: 300px;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;
        z-index:2;
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

export const _HeaderBurger = styled.div<IOpen>`
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 15px;
    right: 20px;
    z-index: 20;
    display: none;

    @media (max-width: 1220px) {
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
    }
    
    div {
        width: 2rem;
        height: 0.25rem;
        background-color: #ccc;
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;

        &:nth-child(1) {
        transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
        }

        &:nth-child(2) {
        transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
        opacity: ${({ open }) => open ? 0 : 1};
        }

        &:nth-child(3) {
        transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        }
    }`;

export const _HeaderLink = styled(Link)`
    padding: 18px 10px;
    color: #fff;
    text-decoration: none;
    border-bottom:1px solid gray;
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
