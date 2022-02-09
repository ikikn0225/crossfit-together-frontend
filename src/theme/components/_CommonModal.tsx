import styled, { css } from 'styled-components';

interface IModal {
    isOpen:boolean;
}
export const _CommonModal = styled.div<IModal>`
    position: fixed;
    ${(props)=>props.isOpen
        ? "display:block;"
        : "display:none;"
    }
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
`;
export const _CommonModalContent = styled.div`
    overflow-y: auto;
    display: block;
    position: relative;
    width: 70%;
    margin: 25% auto 0;
    max-height: 70vh;
    padding: 5px;
    background: #fff;
    color:#000;
    white-space: pre-wrap;
    line-height:30px;
`;

export const _CommonModalCloseButtonDiv = styled.div`
    text-align:end;

    & > button {
        padding: 10px 10px;
        color:#fff;
        border:solid 1px #075DC6;
        background: #075DC6;
        cursor: pointer;
    }
`;

export const _CommonModalCloseButton = styled.button`
    padding: 10px 10px;
    color:#fff;
    border:solid 1px #075DC6;
    background: #075DC6;
    cursor: pointer;
`;