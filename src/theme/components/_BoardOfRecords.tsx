import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { _ButtonCommon } from './_Button';
import { _Container, _SubContainer } from './_Layout';
import { _NoBoxSpan } from './_NoBox';
import { _WodCreateWodButton, _WodCreateWodButtonContainer, _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer, _WodListLayout, _WodListSubContainer, _WodNoContent, _WodUpdateWodLinkContainer } from './_Wod';

export const _BoardImgContainer = styled(_WodImgContainer)``;

export const _BoardImg = styled(_WodImg)``;

export const _BoardImgTitle = styled(_WodImgTitle)``;

export const _BoardCreateWodButton = styled(_WodCreateWodButton)``;

export const _BoardCreateWodButtonContainer = styled(_WodCreateWodButtonContainer)``;

export const _BoardListContainer = styled(_WodListContainer)``;

export const _BoardListSubContainer = styled.div`
    width:auto;
    text-align:center;
    overflow: hidden;
    & > div:nth-child(1) {
        margin-top:6rem;
    }

    & > div {
        margin-bottom:4rem;
        border-bottom:1px solid #3d3d3d;
    }
`;

export const _BoardListLayout = styled.div`
    border-bottom:0px;
    margin-top:2rem;
    margin-bottom:2rem;
`;

export const _BoardListBox = styled.div`
    max-height: 200px;
    margin-left:3rem;
    margin-right:3rem;
    border:1px solid #3d3d3d;
    overflow-y: auto;
`;

export const _BoardListBoxContent = styled.div`
    padding-top:1rem;
    padding-bottom:1rem;
    border-bottom:1px solid #3d3d3d;
    & > div:last-child {
        border-bottom:0px;
    }
`;

export const _BoardNoContent = styled(_WodNoContent)`
    padding-top:3rem;
    padding-bottom:3rem;
`;

export const _BoardListBoxNewContent = styled.div`
    display:none;
`;

export const _BoardCreateBoardContainer = styled(_WodUpdateWodLinkContainer)``;