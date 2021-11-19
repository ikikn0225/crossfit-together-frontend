import styled from "styled-components";
import { _BoardListLayout } from "./components/_BoardOfRecords";
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

export const _HoldSpan = styled(_CreateWodSpan)``;

export const _HoldNoContent = styled(_LeaderBoardNoContent)``;

export const _HoldListTitle = styled.div`
    font-size:1em;
    padding:1rem;
`;