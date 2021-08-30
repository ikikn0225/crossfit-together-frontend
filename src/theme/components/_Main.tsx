import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface IMainImgProps {
    backgroundImage:string;
}

export const _MainImgBox = styled.div`
    position:relative;
    height:30vh;

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        height:40vh;
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        height:50vh;
    }
`;

export const _MainBackgroundImg = styled.div<IMainImgProps>`
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-image: url(${(props)=>props.backgroundImage});
    -webkit-filter: grayscale(100%);
    filter:gray;

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        height:40vh;
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        height:50vh;
    }
`;

export const _MainImg = styled.div<IMainImgProps>`
    position: absolute;
    top: 0;
    left: 0;
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
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        width:50%;
        margin: auto;
        padding-top:3rem;
    }
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

export const _MainNavLiImg = styled.div<IMainImgProps>`
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        height:30vh;
        background-size: cover;
        background-image: url(${(props)=>props.backgroundImage});
        -webkit-filter: grayscale(100%);
        filter:gray;
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