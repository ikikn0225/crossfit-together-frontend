import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { _ButtonCommon } from './_Button';
import { _CreateAccountSelect } from './_CreateAccount';
import { _WodImg, _WodImgContainer, _WodImgTitle } from './_Wod';

export const _CreateWodSubContainer = styled.div`
    width: 100%;
    padding: 0 30px;

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        width:50%;
        margin: auto;
        padding-top:3rem;
    }
`;

export const _CreateWodImgContainer = styled(_WodImgContainer)``;

export const _CreateWodImg = styled(_WodImg)``;

export const _CreateWodImgTitle = styled(_WodImgTitle)``;

export const _CreateWodForm = styled.form`
    display:grid;
    width: 100%;
    margin-top:1rem;
    gap: 1rem;
`;

export const _CreateWodSpan = styled.span`
    margin-top:2rem;
    padding-bottom:0.5rem;
    font-size:${(props) => props.theme.fontSizes.md};
    font-weight:${(props) => props.theme.fontWeights.bold};

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        font-size:${(props) => props.theme.fontSizes.lg};
        font-weight:${(props) => props.theme.fontWeights.bold};
    }
`;

export const _CreateWodCalendarButton = styled(_ButtonCommon)`
    color: #000;
    font-weight: 500;
    width: 100%;
    font-size:1em;
`;

export const _CreateWodInput = styled.input`
    width:100%;
    height: 2.25rem;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 2px;
`;

export const _CreateWodCategorySelect = styled(_CreateAccountSelect)``;

export const _CreateWodTextArea = styled.textarea`
    width:100%;
    height: 100px;
    max-height:230px;
    white-space: pre-line;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 2px;
`;