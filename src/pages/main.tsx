import { useMe } from "@/hooks/useMe";
import styled from 'styled-components';


const _MainBigContainer = styled.div`
    background-size: cover;
`;

const _MainImg = styled.div`
    backgroundImage:url(${})
`;

//여기에 myaffiliatedbox query 

export const Main = () => {
    const {data, loading, error} = useMe();
    return (
        <_MainBigContainer>
            <_MainImg>
            </_MainImg>
            <span>{data?.me.affiliatedBoxId}</span>
        </_MainBigContainer>
    )
}