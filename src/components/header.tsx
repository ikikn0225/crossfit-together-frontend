import { LOCALSTORAGE_TOKEN } from "@/constants";
import { clearCookie } from "@/cookie";
import { useMe } from "@/hooks/useMe"
import { useHistory } from "react-router-dom";
import { _HeaderNotVerifyContainer ,_HeaderContainer ,_HeaderLogo ,_HeaderLogOutButton, _HeaderUl, _HeaderLl, _HeaderMenuAcordion } from "../theme/components/_Header";

export const Header:React.FC = () => {
    const { client, data } = useMe();
    const history = useHistory();
    const logOutClick = () => {
        client.cache.reset().then(() => {
            clearCookie('authorization');
            location.reload();
        })
        history.push("/");
    }
    
    return (
        <>
            {!data?.me.verified &&
                (
                    <_HeaderNotVerifyContainer>
                        <span>Please verify your email.</span>
                    </_HeaderNotVerifyContainer>
                )
            }
            <_HeaderContainer>
                <_HeaderLogo>
                    <img src="../../public/images/logo_black_fake.jpg" />
                </_HeaderLogo>
                {/* 아래는 nav로 만들기(마이페이지, 로그아웃) */}
                <_HeaderUl>
                    <_HeaderLl>NOTICE</_HeaderLl>
                    <_HeaderLl>TIME TABLE</_HeaderLl>
                    <_HeaderLl>MY PAGE</_HeaderLl>
                </_HeaderUl>
            
                <_HeaderLogOutButton onClick={logOutClick}>
                    LogOut
                </_HeaderLogOutButton>
                <_HeaderMenuAcordion>&#9776;</_HeaderMenuAcordion>
            </_HeaderContainer>
        </>
    )
}