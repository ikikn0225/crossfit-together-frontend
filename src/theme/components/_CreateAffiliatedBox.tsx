import styled, { css } from 'styled-components';

export const _CreateAffiliatedBoxForm = styled.form`
    display:grid;
    width: 100%;
    gap: 1rem;
`

export const _CreateAffiliatedBoxInput = styled.input`
    width:100%;
    height: 2.25rem;
    border-width: thin;
    border-style: solid;
    border-color: ${(props) => props.theme.mode.border}
    border-radius: 2px;
`;

export const _CreateAffiliatedBoxFileInput = styled(_CreateAffiliatedBoxInput)`
    height:auto;
    display:none;
`;

export const _CreateAffiliatedBoxFileLabel = styled.label `
    height: 2.25rem;
    border-radius: 3px;
    border:1px solid #fff;
    background-color:#fff;
    padding:0.5rem;
    color:#282828;
`;

