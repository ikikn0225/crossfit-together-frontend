import styled, { css } from 'styled-components';
import { _ButtonCommon } from './_Button';
import { _Container, _SubContainer } from './_Layout';
import { _NoBoxSpan } from './_NoBox';

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

export const _WodCreateWodButtonContainer = styled.div`
    text-align:right;
`;

export const _WodCreateWodButton = styled(_ButtonCommon)`
    margin:20px;
    background-color: rgb(7,93,198);
    border-color:rgb(7,93,198);

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size: 1.3rem;
        height: 2.5rem;
        font-weight: 600;
        margin:30px;
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        font-size: 1.5rem;
        height: 2.75rem;
        font-weight: 700;
        margin:50px;
    }
`;

export const _WodListContainer = styled.div`
    position:relative;
`;

export const _WodListSubContainer = styled.div`
    width:auto;
    text-align:center;
`;

export const _WodListLayout = styled.div`
    margin-top:2rem;
    margin-bottom:4rem;
`;

export const _WodNoContent = styled.div`
    padding-top:100px;
    font-size:${(props) => props.theme.fontSizes.md};
    font-weight:${(props) => props.theme.fontWeights.bold};
`;

export const _WodListTitle = styled.div`
    padding-bottom:1rem;
    font-size:${(props) => props.theme.fontSizes.md};
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size:${(props) => props.theme.fontSizes.lg};
        font-weight:${(props) => props.theme.fontWeights.bold};
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        font-size:${(props) => props.theme.fontSizes.xxl};
        font-weight:${(props) => props.theme.fontWeights.extraBold};
    }
`;

export const _WodListContent = styled.div`

`;