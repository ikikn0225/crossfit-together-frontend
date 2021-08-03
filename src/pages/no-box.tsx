import { ButtonCommonStyle } from "@/components/button";
import { useMe } from "@/hooks/useMe";
import { LoadingSpanStyle, LoadingStyle } from "@/router/logged-in-router";
import { UserRole } from "@/__generated__/globalTypes";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BigContainer, FormStyle, InputStyle, SmallContainer } from "./login";

const _SmallContainerExtend = styled(SmallContainer)`
    width:auto;
    padding:0;
`;

const _No_Affiliated_Box = styled.div`
    text-align:center;
`;

const _CreateAffiliatedBoxButton = styled(ButtonCommonStyle)`
    color:#000;
    margin:2rem;
    height:4rem;
`;


export const NoBox = () => {
    const { data, loading, error } = useMe();
    const history = useHistory();

    const gotoCreateAffiliatedBox = () => {
        history.push("/create-affiliated-box");
    }

    if (!data || loading || error) {
        return (
            <LoadingStyle>
                <LoadingSpanStyle>Loading...</LoadingSpanStyle>
            </LoadingStyle>
        );
    }
    return(
    <_SmallContainerExtend>
        {data.me.role === UserRole.Crossfiter && (
            <>
            <Helmet>
                <title>No Affiliated Box | CrossfiTogether</title>
            </Helmet>
            <_No_Affiliated_Box>
                <span>There is no Affiliated Box yet.</span>    
            </_No_Affiliated_Box>
        </>
        )}
        {data.me.role === UserRole.Coach && (
            <>
                <Helmet>
                    <title>No Affiliated Box | CrossfiTogether</title>
                </Helmet>
                <_No_Affiliated_Box>
                    <span>There is no Affiliated Box yet.</span>    
                </_No_Affiliated_Box>
                <_CreateAffiliatedBoxButton onClick={gotoCreateAffiliatedBox}>Create Affiliated Box</_CreateAffiliatedBoxButton>
            </>
        )}
    </_SmallContainerExtend>
    )
}