import { LOCALSTORAGE_TOKEN } from "@/constants";
import { clearCookie } from "@/cookie";
import { useMe } from "@/hooks/useMe"
import { useHistory } from "react-router-dom";
import { _HeaderNotVerifyContainer ,_HeaderContainer } from "../theme/components/_Header";
import styled, { css } from 'styled-components';
import Burger from "./menu";

const Nav = styled.nav`
    width: 100%;
    height: 70px;
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
                    <img src="../../public/images/logo_black.jpg" />
                </div>
                <Burger />
            </Nav>
        </>
    )
}