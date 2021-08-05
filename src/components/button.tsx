import styled from "styled-components"
import { _Button } from "../theme/components/_Button"

interface IButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

export const Button:React.FC<IButtonProps> = ({canClick, loading, actionText}) => {


    return (
        <_Button canClick={canClick}>
            {loading ? "Loading..." : actionText}
        </_Button>
    );
}