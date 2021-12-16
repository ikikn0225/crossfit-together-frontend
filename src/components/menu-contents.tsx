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
            <_HeaderLink to="/" onClick={closeMenu}>홈</_HeaderLink>
            <_HeaderLink to="/notices" onClick={closeMenu}>게시판</_HeaderLink>
            {/* <_HeaderLink to="/wod" onClick={closeMenu}>WOD</_HeaderLink>
            <_HeaderLink to="/leader-board" onClick={closeMenu}>LEADER BOARD</_HeaderLink>
            <_HeaderLink to="/board-of-record" onClick={closeMenu}>BOARD OF RECORD</_HeaderLink>
            <_HeaderLink to="/free-trial" onClick={closeMenu}>FREE TRIAL</_HeaderLink>
            <_HeaderLink to="/hold" onClick={closeMenu}>HOLD</_HeaderLink> */}
            <_HeaderLink to="/time-table" onClick={closeMenu}>시간표</_HeaderLink>
            <_HeaderLink to="/mypage" onClick={closeMenu}>마이페이지</_HeaderLink>
            <_HeaderLogOutButton onClick={logOutClick}> 로그아웃 </_HeaderLogOutButton>
        </_HeaderUl>
    )
}

export default HeaderRightNav