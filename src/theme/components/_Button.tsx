import styled, { css } from 'styled-components';

export const _ButtonCommon = styled.button`
        color:${({ theme }) => theme.mode.primaryText};
        font-size: 1.125rem;
        height: 2.25rem;
        font-weight: 500;
        focus:thin dotted;
        border-radius: 3px;
        font-weight: bold;
        outline: none;
        border: none;
`;

interface _IButtonProps {
    canClick: boolean;
}

export const _Button = styled(_ButtonCommon)<_IButtonProps>`
${ props => props.canClick
    ? "background-color: rgb(7,93,198); border-color:rgb(7,93,198); color:white; cursor:pointer;"
    : "background-color: gray; border-color:gray; color:white;"
}
`;