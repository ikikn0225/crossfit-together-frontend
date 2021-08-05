import { useMe } from "@/hooks/useMe";
import { useMyBox } from "@/hooks/useMyBox";
import { _MainContainer, _MainImg } from "../theme/components/_Main"

export const Main = () => {
    const {data, loading, error} = useMe();
    const {data:myAffiliatedBox} = useMyBox();
    return (
        <_MainContainer>
            {/* backgroundImage={myAffiliatedBox?.affiliatedBox?.coverImg} */}
            <_MainImg backgroundImage={"../../public/images/ikikn.jpg"}>
            </_MainImg>
            <span>{data?.me.affiliatedBoxId}</span>
        </_MainContainer>
    )
}