import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface IMainImgProps {
    backgroundImage:string;
}

export const _MainImg = styled.div<IMainImgProps>`
    height:30vh;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url(${(props)=>props.backgroundImage}); 

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        height:40vh;
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        height:50vh;
    }
`;

export const _MainNavUl = styled.ul`
    border-color:gray;
`;

export const _MainNavLi = styled.li`
    display:block;
    width:100%;
    line-height:50px;
    padding:5px 10px;
    text-align:center;

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        line-height:70px;
    }

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        display:inline-block;
        width:20%;
    }
`;

export const _MainNavLink = styled(Link)`
    color:${(props)=>props.theme.mode.primaryText};
    text-decoration:none;
    list-style:none;
    box-sizing:border-box;
    font-size:${(props)=>props.theme.fontSizes.lg};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        font-size:${(props)=>props.theme.fontSizes.xl};
    }
`;

export const _MainNavA = styled.a`
    color:${(props)=>props.theme.mode.primaryText};
    text-decoration:none;
    list-style:none;
    box-sizing:border-box;
    font-size:${(props)=>props.theme.fontSizes.lg};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        font-size:${(props)=>props.theme.fontSizes.xl};
    }
`;