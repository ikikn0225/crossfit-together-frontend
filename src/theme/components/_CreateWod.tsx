import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const _CreateWodSubContainer = styled.div`
    width: 100%;
    padding: 0 30px;

    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        width:50%;
        margin: auto;
        padding-top:3rem;
    }
`;

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

export const _CreateWodInput = styled.input`
    width:100%;
    height: 2.25rem;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 2px;
`;

export const _CreateWodTextArea = styled.textarea`
    width:100%;
    height: 100px;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 2px;
`;