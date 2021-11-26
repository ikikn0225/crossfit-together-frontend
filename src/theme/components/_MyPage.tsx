import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { _ButtonCommon } from './_Button';
import { _Container, _SubContainer } from './_Layout';
import { _NoBoxSpan } from './_NoBox';
import { _WodCreateWodButton, _WodCreateWodButtonContainer, _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer, _WodListLayout, _WodListSubContainer, _WodNoContent, _WodUpdateWodLinkContainer } from './_Wod';

export const _MyPageImgContainer = styled(_WodImgContainer)``;

export const _MyPageImg = styled(_WodImg)``;

export const _MyPageImgTitle = styled(_WodImgTitle)``;

export const _MyPageProfileContainer = styled.div`
    text-align:center;
`;

export const _MyPageProfileImgContainer = styled.div`
    width: 100px;
    height: 100px; 
    border-radius: 70%;
    overflow: hidden;
    display:inline-block;
    margin-top:50px;
    margin-bottom:20px;
`; 

interface IMyPageImgProps {
    img:string|undefined|null;
}

export const _MyPageProfileImg = styled.img<IMyPageImgProps>`
    width: 102%;
    height: 102%;
    background-size: cover;
    background-image: url(${(props)=>props.img});
    margin:-1px;
`;

export const _MyPageProfileSpan = styled.span`
    display:block;
    margin-bottom:10px;
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size:${(props) => props.theme.fontSizes.lg};
    }
`;

export const _MyPageContainer = styled(_WodListContainer)``;

export const _MyPageSubContainer = styled.div`
    width:auto;
    text-align:center;
    overflow: hidden;
    margin-top:3rem;
`;

export const _MyPageTabContainer = styled.ul`
    & > li:nth-child(3) {
        width:25%;
    }
    & > li:nth-child(4) {
        width:18%;
    }
`;

interface ITab {
    active:number;
    tabId:number;
}
export const _MyPageTab = styled.li<ITab>`
    display: inline-block;
    border-right: 1px solid #3d3d3d;
    padding: 1rem;
    background-color:gray;

    ${(props)=>props.active == props.tabId
        ? "background-color: rgb(7,93,198); border: 1px solid rgb(7,93,198);"
        : "background-color: gray;"
    }

`;

export const _MyPageListBoxContentContainer = styled.div`
    margin:3rem;
    padding-top:100px;
    padding-bottom:100px;
    border:1px solid #3d3d3d;
`;

interface IContent {
    record?:number;
}
export const _MyPageListBoxContent = styled.div<IContent>`
    padding-bottom:1rem;
    display:inline-block;
    margin-right:1rem;

    & > span {
        font-weight:${(props) => props.theme.fontWeights.bold};
        font-size:${(props) => props.theme.fontSizes.lg};
    }
    ${(props)=>props.record
        && "font-size:xx-large; font-weight:bold;display:inline-block;"
    }
`;

export const _MyPageNoContent = styled(_WodNoContent)`
    margin:3rem;
    padding-bottom:100px;
    border:1px solid #3d3d3d;
`;

export const _MyPageContents = styled.div`
    margin-top:3rem;
`;

export const _MyPageLeaderBoardTitle = styled.span`
    font-weight:${(props) => props.theme.fontWeights.bold};
    font-size:${(props) => props.theme.fontSizes.lg};
    float:left;
`;