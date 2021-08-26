import { useMe } from "@/hooks/useMe";
import { useMyBox } from "@/hooks/useMyBox";
import { _Container, _SubContainer } from "@/theme/components/_Layout";
import { _MainImg, _MainNavLi, _MainNavLink, _MainNavUl } from "@/theme/components/_Main";
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
            <_MainImg backgroundImage={myAffiliatedBox?.myAffiliatedBox.affiliatedBox.coverImg+""}></_MainImg>
            <_MainNavUl>
                <_MainNavLi><_MainNavLink className="active" to="/wod">WOD</_MainNavLink></_MainNavLi>
                <_MainNavLi><_MainNavLink to="/leader-board">LEADER BOARD          </_MainNavLink></_MainNavLi>
                <_MainNavLi><_MainNavLink to="/board-of-record">BOARD OF RECORD       </_MainNavLink></_MainNavLi>
                <_MainNavLi><_MainNavLink to="/free-trial">FREE TRIAL            </_MainNavLink></_MainNavLi>
                <_MainNavLi><_MainNavLink to="/hold">HOLD                  </_MainNavLink></_MainNavLi>
            </_MainNavUl>
        </>
    )
}