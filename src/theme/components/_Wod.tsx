import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
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
    border-bottom:1px solid #3d3d3d;
`;

export const _WodCreateWodButton = styled(_ButtonCommon)`
    margin:20px;
    // background-color: rgb(7,93,198);
    background-color: black;
    border-color:rgb(7,93,198);
    cursor:pointer;

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

export const _WodUpdateWodLinkContainer = styled.div`
    text-align:right;
    margin-right:20px;
    padding:5px;

    div {
        margin-bottom:10px;
    }
`;

export const _WodUpdateWodLink = styled(Link)`
    padding:5px;
    // background-color: rgb(7,93,198);
    background-color: black;
    border-color:rgb(7,93,198);
    color:${({ theme }) => theme.mode.primaryText};
    font-size: 1.125rem;
    border-radius: 3px;
    font-weight: bold;
    outline: none;
    border: none;
    text-decoration:unset;

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

export const _WodDeleteWodButton = styled(_ButtonCommon)`
    // background-color:#FF0000;
    background-color: black;
    font-size: 1.125rem;
    font-weight: bold;
    cursor:pointer;
`;

export const _WodListContainer = styled.div`
    position:relative;
    background:#000;
`;

export const _WodListSubContainer = styled.div`
    width:auto;
    text-align:center;
    overflow: hidden;
    & > div:nth-child(1) {
        position:relative;
    }
    & > div:nth-child(1) > div:nth-child(1) {
        position:absolute;
        left:0;
        top:0px;
        padding:10px;
        background: #000;
        z-index:2000;
    }
    & > div:nth-child(1) > div:nth-child(2) {
        position:absolute;
        height:36px;
        left:28px;
        top:0px;
        padding:10px;
        background: linear-gradient(to right, rgba(0, 0, 0, 1) 20%, rgba(33, 33, 33, 0) 80%);
        z-index:2000;
    }
    & > div:nth-child(1) > div:nth-child(4) {
        position:absolute;
        height:36px;
        right:28px;
        top:0px;
        padding:10px;
        background: linear-gradient(to left, rgba(0, 0, 0, 1) 20%, rgba(33, 33, 33, 0) 80%);
        z-index:2000;
    }
    & > div:nth-child(1) > div:nth-child(5) {
        position:absolute;
        right:0;
        top:0px;
        padding:10px;
        background: #000;
        z-index:2000;
    }
`;

export const _WodCategoryContainer = styled.div`
    margin-top:1rem;
    margin-bottom:1rem;
    padding:10px;
    padding-left:22px;
`;

export const _WodCategoryLink = styled(Link)`
    padding:5px;
    background-color: gray;
    border-radius: 20px;
    margin-left: 1rem;
    text-decoration: none;
    color:#fff;
    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: rgb(7,93,198);
        color: #fff;
    }
`;

export const _WodListLayout = styled.div`
    margin-top:2rem;
    margin-bottom:4rem;
    padding-bottom:4rem;
    border-bottom:1px solid #3d3d3d;
    & > div:last-child {
        text-align:end;
    }
`;

export const _WodNoContent = styled.div`
    padding-top:100px;
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

export const _WodListDay = styled.div`
    color:#808080;
    padding-bottom:0.5rem;
    font-size:${(props) => props.theme.fontSizes.md};
    font-weight:${(props) => props.theme.fontWeights.bold};
`;

export const _WodListTitle = styled.div`
    padding-bottom:1rem;
    font-size:${(props) => props.theme.fontSizes.xxl};
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size:${(props) => props.theme.fontSizes.xxl};
        font-weight:${(props) => props.theme.fontWeights.bold};
    }
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletM} {
        font-size:${(props) => props.theme.fontSizes.xxl};
        font-weight:${(props) => props.theme.fontWeights.extraBold};
    }
`;

export const _WodListContent = styled.div`
    white-space: pre-wrap;
    line-height:30px;
`;

export const _WodListLikeContainer = styled.div`
    padding-right:1rem;
    padding-left:1rem;
    margin-top:1rem;
`;

export const _WodFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right:5px;
`;

export const _WodCategoryFontAwesomeIcon = styled(FontAwesomeIcon)`
`;