import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const _CreateAccountForm = styled.form`
    display:grid;
    width: 100%;
    gap: 1rem;
`

export const _CreateAccountInput = styled.input`
    width:100%;
    height: 2.25rem;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 2px;
`;

export const _CreateAccountExtra = styled.div`
    margin-top: 1rem;
    display:grid;
    width: 100%;
    gap: 1rem;
`;

export const _CreateAccountFileInput = styled(_CreateAccountInput)`
    display:none;
`;

export const _CreateAccountSelect = styled.select`
    width:100%;
    height: 2.25rem;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 3px;
`;

export const _CreateAccountLoginLink = styled(Link)`
    float:right;
    color:${({ theme }) => theme.mode.primaryText};
`;

export const _CreateAccountFileLabel = styled.label `
    height: 2.25rem;
    border-radius: 3px;
    border:1px solid #fff;
    background-color:#fff;
    padding:0.5rem;
    color:#282828;
`;
