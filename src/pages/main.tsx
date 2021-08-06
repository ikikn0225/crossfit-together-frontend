import { useMe } from "@/hooks/useMe";
import { useMyBox } from "@/hooks/useMyBox";
import { useEffect } from "react";
import { _MainContainer, _MainImg } from "../theme/components/_Main"

export const Main = () => {
    const {data, loading, error} = useMe();
    const {data:myAffiliatedBox} = useMyBox();
    
    return (
        <_MainContainer>
            <_MainImg backgroundImage={myAffiliatedBox?.myAffiliatedBox.affiliatedBox.coverImg+""}></_MainImg>
            <span>{data?.me.affiliatedBoxId}</span>
        </_MainContainer>
    )
}