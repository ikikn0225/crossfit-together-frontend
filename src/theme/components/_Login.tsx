import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const _LoginLogoImage = styled.img`
    width: 13rem;
    margin: 2.5rem;
`

export const _LoginForm = styled.form`
    display:grid;
    width: 100%;
    gap: 1rem;
`

export const _LoginInput = styled.input`
    width:100%;
    height: 2.25rem;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border};
    border-radius: 3px;
`;

export const _LoginExtra = styled.div`
    margin-top: 1rem;
    display:grid;
    width: 100%;
    gap: 1rem;
`;

export const _LoginCreateAccountLink = styled(Link)`
    float:right;
    color:${({ theme }) => theme.mode.primaryText};
`;