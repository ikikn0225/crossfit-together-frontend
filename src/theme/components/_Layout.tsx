import styled, { css } from 'styled-components';

export const _Container = styled.div`
    height: 100vh;
    position:relative;
    min-width:300px;
`

export const _SubContainer = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 0 30px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
`