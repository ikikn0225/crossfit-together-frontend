import { LOCALSTORAGE_TOKEN } from "@/constants";
import { clearCookie } from "@/cookie";
import { useMe } from "@/hooks/useMe"
import { useHistory } from "react-router-dom";
import { _HeaderNotVerifyContainer ,_HeaderContainer, _HeaderNav } from "../theme/components/_Header";
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
                <div className="logo">
                    <img src="../../public/images/logo_black_fake.jpg" />
                </div>
                <HeaderBurger />
            </_HeaderNav>
        </>
    )
}