import styled from "styled-components";
import { _BoardFontAwesomeIcon, _BoardListLayout } from "./components/_BoardOfRecords";
import { _ButtonCommon } from "./components/_Button";
import { _CreateWodForm, _CreateWodSpan } from "./components/_CreateWod";
import { _LeaderBoardSubContainer, _LeaderBoardNoContent } from "./components/_LeaderBoard";
import { _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer } from "./components/_Wod";

export const _HoldImgContainer = styled(_WodImgContainer)``;

export const _HoldImg = styled(_WodImg)``;

export const _HoldImgTitle = styled(_WodImgTitle)``;

export const _HoldContainer = styled(_WodListContainer)``;

export const _HoldSubContainer = styled(_LeaderBoardSubContainer)``;

export const _HoldForm = styled.form`
    & > div:first-child {
        width:auto;
    }
    border-bottom:1px solid #3d3d3d;
    padding-bottom:2rem;
`;

export const _HoldCalendarButton = styled(_ButtonCommon)`
    display:inline-block;
    color: gray;
    font-size:1em;
    width:auto;
`;

export const _HoldListContainer = styled(_BoardListLayout)`
`;

export const _HoldMemberListContainer = styled.div`
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
interface IHoldSpan {
    holdOwnerId:number;
    meId:undefined|number;
}
export const _HoldSpanContainer = styled.div<IHoldSpan>`
    display:inline-block;
    font-weight: 0.5rem;
    margin-right:1rem;
    padding:0.5rem;
    border-radius:80px;

    ${(props)=>props.holdOwnerId == props.meId
        ? "background-color: rgb(7,93,198);"
        : "background-color:#3d3d3d;"
    }
`;

export const _HoldFontAwesomeIcon = styled(_BoardFontAwesomeIcon)``;

export const _HoldSpan = styled(_CreateWodSpan)``;

export const _HoldNoContent = styled(_LeaderBoardNoContent)``;

export const _HoldListTitle = styled.div`
    font-size:1em;
    padding:1rem;
    font-size:${(props) => props.theme.fontSizes.xl};
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size:${(props) => props.theme.fontSizes.xxl};
        font-weight:${(props) => props.theme.fontWeights.bold};
    }
`;

export const _HoldInputButton = styled.button`
    border:1px solid rgb(7,93,198);
    background-color: rgb(7,93,198);
    color:#fff;
`;
