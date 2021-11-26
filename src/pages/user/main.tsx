import { useMe } from "@/hooks/useMe";
import { useMyBox } from "@/hooks/useMyBox";
import { _Container, _SubContainer } from "@/theme/components/_Layout";
import { _MainImg, _MainNavLi, _MainNavLink, _MainNavUl, _MainNavLiImg, _MainBackgroundImg, _MainImgBox } from "@/theme/components/_Main";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export const Main = () => {
    const {data, loading, error} = useMe();
    const {data:myAffiliatedBox} = useMyBox();
    
    return (
        <>
            <Helmet>
                <title>Main | CrossfiTogether</title>
            </Helmet>
            <_MainImgBox>
                {/* <_MainImg backgroundImage={myAffiliatedBox?.myAffiliatedBox.affiliatedBox.coverImg+""}></_MainImg> */}
                <_MainBackgroundImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit_main_cover.jpeg"}></_MainBackgroundImg>
            </_MainImgBox>
            <_MainNavUl>
                <_MainNavLi>
                    <_MainNavLink className="active" to="/wods">WOD</_MainNavLink>
                    <_MainNavLiImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit_main_wod.jpeg"}></_MainNavLiImg>
                </_MainNavLi>
                <_MainNavLi>
                    <_MainNavLink to="/leader-board">LEADER BOARD</_MainNavLink>
                    <_MainNavLiImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit_main_lb.jpeg"}></_MainNavLiImg>
                </_MainNavLi>
                <_MainNavLi>
                    <_MainNavLink to="/board-of-record">BOARD OF RECORD</_MainNavLink>
                    <_MainNavLiImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit_main_bor.jpeg"}></_MainNavLiImg>
                </_MainNavLi>
                <_MainNavLi>
                    <_MainNavLink to="/free-trial">FREE TRIAL</_MainNavLink>
                    <_MainNavLiImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit_main_ft.jpeg"}></_MainNavLiImg>
                </_MainNavLi>
                <_MainNavLi>
                    <_MainNavLink to="/hold">HOLD</_MainNavLink>
                    <_MainNavLiImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit_main_hold.jpeg"}></_MainNavLiImg>
                </_MainNavLi>
            </_MainNavUl>
        </>
    )
}