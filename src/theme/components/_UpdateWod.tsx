import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { _WodImg, _WodImgContainer, _WodImgTitle } from './_Wod';

export const _UpdateWodSubContainer = styled.div`
    width: 100%;
    padding: 0 30px;

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        width:50%;
        margin: auto;
        padding-top:3rem;
    }
`;

export const _UpdateWodImgContainer = styled(_WodImgContainer)``;

export const _UpdateWodImg = styled(_WodImg)``;

export const _UpdateWodImgTitle = styled(_WodImgTitle)``;