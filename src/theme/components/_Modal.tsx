import styled, { css, keyframes } from 'styled-components';

interface IModalSection {
    visible: boolean;
    top: number|string|undefined;
}

// animations
const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

// components
export const modalSettings = (visible: boolean) => css`
    visibility: ${visible ? 'visible' : 'hidden'};
    z-index: 15;
    animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
    transition: visibility 0.15s ease-out;
`;

export const _ModalBackground = styled.div<{ visible: boolean }>`
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    ${(props) => modalSettings(props.visible)}
`;

export const _ModalSection = styled.div<IModalSection>`
    width: 400px;
    position: absolute;
    top: ${(props) => props.top ? props.top : "50%"};
    left: 50%;
    margin-top:50px;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 1);
    padding: 16px;
    ${(props) => modalSettings(props.visible)}
`;

export const _ModalContent = styled.div`
    color:#000;
    padding: 16px 0;
    white-space: pre-wrap;
    line-height:30px;
`;

export const _ModalCloseButton = styled.button`
    padding: 10px 10px;
    color:#fff;
    border:solid 1px #075DC6;
    background: #075DC6;
    cursor: pointer;
    float: right;
`;