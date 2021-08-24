import styled, { css } from 'styled-components';

export const _Container = styled.div`
    height: 100vh;
    position:relative;
`

export const _SubContainer = styled.div`
    width: 100%;
    padding: 0 30px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    @media only screen and ${(props)=>props.theme.reactiveTheme?.tabletS} {
        display: inline-block;
        text-align: center;
        width:50%;
    }
`