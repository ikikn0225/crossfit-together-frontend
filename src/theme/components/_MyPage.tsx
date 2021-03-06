import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { _ButtonCommon } from './_Button';
import { _CreateAffiliatedBoxForm } from './_CreateAffiliatedBox';
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

export const _MyPageContainer = styled(_WodListContainer)`
    & > div:last-child {
        top: -50%;
    }
`;

export const _MyPageSubContainer = styled.div`
    width:auto;
    text-align:center;
    overflow: hidden;
    margin-top:3rem;
`;

export const _MyPageTabContainer = styled.ul`
    text-align:center;
    padding-left:2rem;
    padding-right:2rem;
`;

interface ITab {
    active:number;
    tabId:number;
}
export const _MyPageTab = styled.li<ITab>`
    cursor:pointer;
    display: inline-block;
    border-right: 1px solid #636363;
    padding: 1rem;
    background-color:gray;
    width: 25%;

    ${(props)=>props.active == props.tabId
        ? "background-color: rgb(7,93,198); border: 1px solid rgb(7,93,198);"
        : "background-color: gray;"
    }

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        height:90px;
    }

`;

interface IMyPageContent {
    myPageContent?:string;
}

export const _MyPageListBoxContentContainer = styled.div<IMyPageContent>`
    border:1px solid #3d3d3d;

    ${(props)=>props.myPageContent
        ? "margin-top:1rem; margin-bottom:1rem; padding-left: 1rem; padding-top: 1rem; padding-bottom: 1rem; cursor:pointer;"
        : "margin-top:1rem; margin-bottom:1rem; padding-top:100px; padding-bottom:100px; width:100%;"
    }
`;

interface IContent {
    record?:number;
}
export const _MyPageListBoxContent = styled.div<IContent>`
    padding-top:1rem;
    padding-bottom:1rem;
    display:inline-block;
    margin-right:1rem;

    & > span {
        font-weight:${(props) => props.theme.fontWeights.bold};
        font-size:${(props) => props.theme.fontSizes.lg};
    }
    ${(props)=>props.record
        && "font-size:large; font-weight:regular;display:inline-block;"
    }
`;

interface INoContent {
    hold?:boolean;
}

export const _MyPageNoContent = styled(_WodNoContent)<INoContent>`
    margin-top:1rem;
    margin-bottom:1rem;
    padding-bottom:100px;
    ${(props)=>props.hold
        ? ""
        : "border:1px solid #3d3d3d;"
    }
`;

export const _MyPageContents = styled.div`
    margin-top:3rem;
    padding-left:2rem;
    padding-right:2rem;
`;

export const _MyPageTitle = styled.span`
    padding:20px;
    font-weight:${(props) => props.theme.fontWeights.bold};
    font-size:${(props) => props.theme.fontSizes.lg};
`;

export const _MyPageLeaderBoardContentContainer = styled.div`
    text-align:center;
    margin-top:3rem;
`;

export const _MyPageWodDateSpan = styled.p`
    font-weight:${(props) => props.theme.fontWeights.bold};
    font-size:${(props) => props.theme.fontSizes.lg};
`;

export const _MyPageListBoxContentLayout = styled.div`
    
`;

export const _MyPageFreeTrialContentContainer = styled.div`
    width: 70%;
    padding:4rem;
    height: 160px;
    margin: 100px auto;
    position: relative;
    transition: all 300ms cubic-bezier(0.03, 0.98, 0.53, 0.99) 0s;
    background: linear-gradient(
    to right,
    #808080,
    #1E90FF,
    #0074e4,
    #015dc6
    );
    border-radius: 20px;
    padding: 5px;

    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 65px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        z-index: 2;
        background-color: #000;
    }

    &:before {
        border: 2px solid #808080;
        left: -15px;
    }
    
    &:after {
        border: 2px solid #015dc6;
        right: -15px;
    }
`;

export const _MyPageFreeTrialContent = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background: #000;
    border-radius: 15px;
    text-align:center;
    padding-top:2rem;
    padding-bottom:2rem;
`;

interface INoRep {
    norep?:number;
}

export const _MyPageFreeTrialContentTitle = styled.div<INoRep>`
    padding-top:1rem;
    font-weight:${(props) => props.theme.fontWeights.regular};
    font-size:${(props) => props.theme.fontSizes.md};

    ${(props)=>props.norep
        ? "padding-top:2rem;font-weight:700; font-size:20px;"
        : "padding-top:1rem;font-weight:400; font-size:16px;"
    }
`;

export const _MyPageFreeTrialContentDate = styled.div`
    padding-top:1rem;
    font-weight:${(props) => props.theme.fontWeights.bold};
    font-size:${(props) => props.theme.fontSizes.lg};
`;

export const _MyPageFreeTrialContentLink = styled(Link)`
    color: #fff; 
    text-decoration: none;
    
    & > div:hover {
        transform: scale( 1.1 );
    }
`;

export const _MyPageHoldContentTitle = styled(_MyPageFreeTrialContentTitle)`
    margin-top:2rem;
`;

export const _MyPageHoldListTitleContainer = styled.div`
    border:1px solid gray;
    margin-top:1rem;
    margin-bottom:3rem;
    text-align:center;
`;

export const _MyPageHoldListTitle = styled.div`
    font-size:1em;
    padding:1rem;
    font-size:${(props) => props.theme.fontSizes.xl};
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size:${(props) => props.theme.fontSizes.xxl};
        font-weight:${(props) => props.theme.fontWeights.bold};
    }
`;

export const _MyPageToggleButton = styled.button`
    height: 2.25rem;
    background-color: rgb(7,93,198);
    border: 1px solid rgb(7,93,198);
    color: #fff;
    cursor: pointer;
`;

interface changePwToggle {
    changePwToggleState:number;
}
export const _MyPageChangePwForm = styled(_CreateAffiliatedBoxForm)<changePwToggle>`
    text-align:center;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 1rem;
    width:auto;
    ${(props)=>props.changePwToggleState
        ? "display:grid;"
        : "display:none;"
    }
`;

export const _MyPageChangePwInput = styled.input`
    display:block;
    height: 2.25rem;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 2px;
`;

interface IModal {
    visible:boolean;
}
export const _MypageModal = styled.div<IModal>`
    position: fixed;
    ${(props)=>props.visible
        ? "display:block;"
        : "display:none;"
    }
    // display: none;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
`;
export const _MypageModalContent = styled.div`
    overflow-y: auto;
    display: block;
    position: relative;
    width: 70%;
    margin: 25% auto 0;
    max-height: 70vh;
    padding: 5px;
    background: #fff;
    color:#000;
    white-space: pre-wrap;
    line-height:30px;
`;

export const _MypageModalCloseButton = styled.button`
    padding: 10px 10px;
    color:#fff;
    border:solid 1px #075DC6;
    background: #075DC6;
    cursor: pointer;
    float: right;
`;

export const _MyPageFontAwesomeIcon = styled(FontAwesomeIcon)`
    color:#707070;
`;

export const _MyPageModalButton = styled.button`
    font-size: 1.125rem;
    height: 2.25rem;
    font-weight: bold;
    background-color: rgb(7,93,198);
    border: 1px solid rgb(7,93,198);
    color: #fff;
    cursor: pointer;
    width:100%;
`;