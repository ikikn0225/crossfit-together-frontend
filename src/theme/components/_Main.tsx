import styled, { css } from 'styled-components';

interface IMainImgProps {
    backgroundImage:string;
}

export const _MainContainer = styled.div`
    background-size: cover;
`;

export const _MainImg = styled.div<IMainImgProps>`
    height:auto;
    background: url(${(props)=>props.backgroundImage}); 
`;