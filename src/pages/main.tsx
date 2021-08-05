import { useMe } from "@/hooks/useMe";
import { useMyBox } from "@/hooks/useMyBox";
import { useEffect } from "react";
import { _MainContainer, _MainImg } from "../theme/components/_Main"

export const Main = () => {
    const {data, loading, error} = useMe();
    const {data:myAffiliatedBox} = useMyBox();

    useEffect(() => {
        
    }, []);
    
    return (
        <_MainContainer>
            <_MainImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/1628059710351default_Bar.png"}></_MainImg>
            <span>{data?.me.affiliatedBoxId}</span>
        </_MainContainer>
    )
}