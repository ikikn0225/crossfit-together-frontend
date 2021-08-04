import { useMe } from "@/hooks/useMe";
import { useMyBox } from "@/hooks/useMyBox";
import styled from 'styled-components';

interface IMainImgProps {
    backgroundImage:string;
}

const _MainBigContainer = styled.div`
    background-size: cover;
`;

const _MainImg = styled.div<IMainImgProps>`
    height:auto;
    background: url(${(props)=>props.backgroundImage}); 
`;

export const Main = () => {
    const {data, loading, error} = useMe();
    const {data:myAffiliatedBox} = useMyBox();
    return (
        <_MainBigContainer>
            {/* backgroundImage={myAffiliatedBox?.affiliatedBox?.coverImg} */}
            <_MainImg backgroundImage={"../../public/images/ikikn.jpg"}>
            </_MainImg>
            <span>{data?.me.affiliatedBoxId}</span>
        </_MainBigContainer>
    )
}