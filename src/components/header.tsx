import { useMe } from "@/hooks/useMe"
import styled from "styled-components";

const NotVerify = styled.div`
    padding: 0.75rem;
    background-color:red;
    text-align:center;
    font-size:20px;
    color:white;
`


export const Header:React.FC = () => {
    const { data } = useMe();
    console.log(data);
    
    return (
        <>
            {!data?.me.verified && (
                <NotVerify>
                    <span>Please verify your email.</span>
                </NotVerify>
            )}
        </>
    )
}