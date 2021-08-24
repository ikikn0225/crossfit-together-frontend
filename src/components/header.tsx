import { LOCALSTORAGE_TOKEN } from "@/constants";
import { clearCookie } from "@/cookie";
import { useMe } from "@/hooks/useMe"
import { useHistory } from "react-router-dom";
import { _HeaderNotVerifyContainer ,_HeaderContainer ,_HeaderLogo ,_HeaderLogOutButton, _HeaderUl, _HeaderLl } from "../theme/components/_Header";
import styled, { css } from 'styled-components';
import Burger from "./menu";

const Nav = styled.nav`
    width: 100%;
    height: 70px;
    border-bottom: 2px solid #f1f1f1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    .logo {
        padding: 15px 0;
        width: 9rem;
    }
`


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
            <Nav>
                <div className="logo">
                    <img src="../../public/images/logo_black_fake.jpg" />
                </div>
                <Burger />
            </Nav>
        </>
    )
}