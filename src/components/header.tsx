import { LOCALSTORAGE_TOKEN } from "@/constants";
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
    const { client, data } = useMe();
    const logOutClick = () => {

        client.cache.reset().then(() => {
            localStorage.setItem(LOCALSTORAGE_TOKEN, '');
            location.reload();
        })
    }
    
    return (
        <>
            {data?.me.verified 
            ? <button onClick={logOutClick}>Logout</button>
            :(
                <NotVerify>
                    <span>Please verify your email.</span>
                </NotVerify>
            )}
        </>
    )
}