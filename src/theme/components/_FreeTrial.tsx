import styled from "styled-components";
import { _BoardFontAwesomeIcon, _BoardListLayout } from "./_BoardOfRecords";
import { _ButtonCommon } from "./_Button";
import { _CreateWodSpan } from "./_CreateWod";
import { _LeaderBoardNoContent, _LeaderBoardSubContainer } from "./_LeaderBoard";
import { _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer } from "./_Wod";


export const _FreeTrialImgContainer = styled(_WodImgContainer)``;

export const _FreeTrialImg = styled(_WodImg)``;

export const _FreeTrialImgTitle = styled(_WodImgTitle)``;

export const _FreeTrialContainer = styled(_WodListContainer)``;

export const _FreeTrialSubContainer = styled(_LeaderBoardSubContainer)``;

export const _FreeTrialForm = styled.form`
    & > div:first-child {
        width:auto;
    }
    border-bottom:1px solid #3d3d3d;
    padding-bottom:2rem;
`;

export const _FreeTrialCalendarButton = styled(_ButtonCommon)`
    display:inline-block;
    color: gray;
    font-size:1em;
    width:auto;
`;

export const _FreeTrialListContainer = styled(_BoardListLayout)`
`;

export const _FreeTrialMemberListContainer = styled.div`
    overflow-x:auto;
    white-space:nowrap;
    padding:1rem;
    ::-webkit-scrollbar {
        height: 5px;
        border-radious: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #2f3542;
    }
`;
interface IFreeTrialSpan {
    freeTrialOwnerId:number;
    meId:undefined|number;
}
export const _FreeTrialSpanContainer = styled.div<IFreeTrialSpan>`
    display:inline-block;
    font-weight: 0.5rem;
    margin-right:1rem;
    padding:0.5rem;
    border-radius:80px;

    ${(props)=>props.freeTrialOwnerId == props.meId
        ? "background-color: rgb(7,93,198);"
        : "background-color:#3d3d3d;"
    }
`;

export const _FreeTrialFontAwesomeIcon = styled(_BoardFontAwesomeIcon)``;

export const _FreeTrialSpan = styled(_CreateWodSpan)``;

export const _FreeTrialNoContent = styled(_LeaderBoardNoContent)``;

export const _FreeTrialListTitle = styled.div`
    font-size:1em;
    padding:1rem;
    font-size:${(props) => props.theme.fontSizes.xl};
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size:${(props) => props.theme.fontSizes.xxl};
        font-weight:${(props) => props.theme.fontWeights.bold};
    }
`;

export const _FreeTrialMyTrialDateLayout = styled.div`
    background-color:rgb(7,93,198);
`;

export const _FreeTrialMyTrialDateTitle = styled.div`
    font-size:0.5em;
    padding:1rem;
    font-size:${(props) => props.theme.fontSizes.lg};
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size:${(props) => props.theme.fontSizes.xl};
        font-weight:${(props) => props.theme.fontWeights.bold};
    }
`;

export const _FreeTrialMyTrialDate = styled.div`
    font-size:0.5em;
    padding:1rem;
    font-size:${(props) => props.theme.fontSizes.lg};
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size:${(props) => props.theme.fontSizes.xl};
        font-weight:${(props) => props.theme.fontWeights.bold};
    }
`;

export const _FreeTrialInputButton = styled.button`
    border:1px solid rgb(7,93,198);
    background-color: rgb(7,93,198);
    color:#fff;
`;
