import { LOCALSTORAGE_TOKEN } from "@/constants";
import { useMe } from "@/hooks/useMe"
import styled from "styled-components";
import { Button, ButtonCommonStyle } from "./button";

const NotVerify = styled.div`
    padding: 0.75rem;
    background-color:red;
    text-align:center;
    font-size:20px;
    color:white;
`

const HeaderContainer = styled.div`
    width: 100%;
    padding:1rem 1.25rem;
    background-color: ${({ theme }) => theme.mode.mainBackground};
    display:flex;
    justify-content: space-between;
    align-items: center;
`;

const ImgContainer = styled.header`
    width: 9rem;
`;

const ButtonStyle = styled(ButtonCommonStyle) `
    font-size: 1rem;
    height: 1.25rem;
    color:black;
    border-radius:1px;
`;


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
            {!data?.me.verified &&
                (
                    <NotVerify>
                        <span>Please verify your email.</span>
                    </NotVerify>
                )
            }
            <HeaderContainer>
                <ImgContainer>
                    <img src="../../public/images/logo_black.jpg" />
                </ImgContainer>
                {/* 아래는 nav로 만들기(마이페이지, 로그아웃) */}
                <ButtonStyle onClick={logOutClick}>
                    LogOut
                </ButtonStyle>
            </HeaderContainer>
        </>
    )
}