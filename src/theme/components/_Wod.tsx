import styled, { css } from 'styled-components';

export const _WodImgContainer = styled.div`
    position:relative;
`;

interface IWodImgProps {
    backgroundImage:string;
}

export const _WodImg = styled.div<IWodImgProps>`
    height:70px;
    background-size: cover;
    background-image: url(${(props)=>props.backgroundImage}); 

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        height:90px;
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        height:120px;
    }
`;

export const _WodImgTitle = styled.div`
    color:#fff;
    font-weight:900;
    font-size:30px;
    position: absolute;
    text-align: center;
    padding-left:10px;
    top:40%;
    left:10%;

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        height:90px;
        font-size:45px;
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        height:120px;
        font-size:60px;
    }
`;