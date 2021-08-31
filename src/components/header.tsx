import { useMe } from "../hooks/useMe"
import { useHistory } from "react-router-dom";
import { _HeaderNotVerifyContainer ,_HeaderContainer, _HeaderNav, _HeaderLogo } from "../theme/components/_Header";
import styled, { css } from 'styled-components';
import HeaderBurger from "./menu";

export const Header:React.FC = () => {
    const { data } = useMe();
    
    return (
        <>
            {!data?.me.verified &&
                (
                    <_HeaderNotVerifyContainer>
                        <span>Please verify your email.</span>
                    </_HeaderNotVerifyContainer>
                )
            }
            <_HeaderNav>
                <_HeaderLogo className="logo" to="/">
                    <img src="../../public/images/logo_black_fake.jpg" />
                </_HeaderLogo>
                <HeaderBurger />
            </_HeaderNav>
        </>
    )
}