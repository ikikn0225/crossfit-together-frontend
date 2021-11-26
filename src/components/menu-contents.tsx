import { client } from '@/apollo';
import { clearCookie } from '@/cookie';
import { _HeaderLink, _HeaderLl, _HeaderLogOutButton, _HeaderUl } from '@/theme/components/_Header';
import React from 'react';
import { useHistory } from 'react-router-dom';

const HeaderRightNav = ({ open, setOpen }:any) => {
    const history = useHistory();
    const logOutClick = () => {
        client.cache.reset().then(() => {
            clearCookie('authorization');
            location.reload();
        })
        history.push("/");
    }
    const closeMenu = () => {
        setOpen(false);
    }
    return (
        <_HeaderUl open={open}>
            {/* <_HeaderLink to="/">NOTICE</_HeaderLink>
            <_HeaderLink to="/">TIME TABLE</_HeaderLink> */}
            <_HeaderLink to="/mypage" onClick={closeMenu}>MY PAGE</_HeaderLink>
            <_HeaderLogOutButton onClick={logOutClick}> LOGOUT </_HeaderLogOutButton>
        </_HeaderUl>
    )
}

export default HeaderRightNav