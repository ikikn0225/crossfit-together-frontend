import styled from "styled-components"

interface IButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

export const ButtonCommonStyle = styled.button`
        color:${({ theme }) => theme.mode.primaryText};
        font-size: 1.125rem;
        height: 2.25rem;
        font-weight: 500;
        focus:thin dotted;
        border-radius: 2px;
        font-weight: bold;
        outline: none;
        border: none;
    `;

export const Button:React.FC<IButtonProps> = ({canClick, loading, actionText}) => {

    const ButtonStyle = styled(ButtonCommonStyle)`
        ${canClick 
            ? "background-color: rgb(7,93,198); border-color:rgb(7,93,198); color:white; cursor:pointer;"
            : "background-color: gray; border-color:gray; color:white;"
        }
    `;

    return (
        <ButtonStyle>
            {loading ? "Loading..." : actionText}
        </ButtonStyle>
    );
}