import { LOCALSTORAGE_TOKEN } from "@/constants";
import { clearCookie } from "@/cookie";
import { useMe } from "@/hooks/useMe"
import { useHistory } from "react-router-dom";
import { _HeaderNotVerifyContainer ,_HeaderContainer ,_HeaderImgContainer ,_HeaderButton } from "../theme/components/_Header";

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
                <_HeaderImgContainer>
                    <img src="../../public/images/logo_black.jpg" />
                </_HeaderImgContainer>
                {/* 아래는 nav로 만들기(마이페이지, 로그아웃) */}
                <_HeaderButton onClick={logOutClick}>
                    LogOut
                </_HeaderButton>
            </_HeaderContainer>
        </>
    )
}