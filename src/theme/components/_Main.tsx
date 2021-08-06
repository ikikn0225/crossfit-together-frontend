import styled, { css } from 'styled-components';

interface IMainImgProps {
    backgroundImage:string;
}

export const _MainContainer = styled.div`
    height:100vh;
`;

export const _MainImg = styled.div<IMainImgProps>`
    height:10vh;
    background-size: cover;
    background-image: url(${(props)=>props.backgroundImage}); 

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        height:20vh;
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        height:25vh;
    }
`;