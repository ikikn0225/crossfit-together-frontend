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
                <_MainNavLi><_MainNavA className="active" href="#">Wod</_MainNavA></_MainNavLi>
                <_MainNavLi><_MainNavA href="#">Leader Board          </_MainNavA></_MainNavLi>
                <_MainNavLi><_MainNavA href="#">Board of Record       </_MainNavA></_MainNavLi>
                <_MainNavLi><_MainNavA href="#">Free Trial            </_MainNavA></_MainNavLi>
                <_MainNavLi><_MainNavA href="#">Hold                  </_MainNavA></_MainNavLi>
            </_MainNavUl>
        </>
    )
}