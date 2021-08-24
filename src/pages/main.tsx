import { useMe } from "@/hooks/useMe";
import { useMyBox } from "@/hooks/useMyBox";
import { _Container, _SubContainer } from "@/theme/components/_Layout";
import { useEffect } from "react";
import { _MainImg, _MainNavLi, _MainNavA, _MainNavUl } from "../theme/components/_Main"

export const Main = () => {
    const {data, loading, error} = useMe();
    const {data:myAffiliatedBox} = useMyBox();
    
    return (
        <>
            <_MainImg backgroundImage={myAffiliatedBox?.myAffiliatedBox.affiliatedBox.coverImg+""}></_MainImg>
            <_MainNavUl>
                <_MainNavLi><_MainNavA className="active" href="#">WOD</_MainNavA></_MainNavLi>
                <_MainNavLi><_MainNavA href="#">LEADER BOARD          </_MainNavA></_MainNavLi>
                <_MainNavLi><_MainNavA href="#">BOARD OF RECORD       </_MainNavA></_MainNavLi>
                <_MainNavLi><_MainNavA href="#">FREE TRIAL            </_MainNavA></_MainNavLi>
                <_MainNavLi><_MainNavA href="#">HOLD                  </_MainNavA></_MainNavLi>
            </_MainNavUl>
        </>
    )
}