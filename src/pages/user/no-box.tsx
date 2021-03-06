import { useMe } from "@/hooks/useMe";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { UserRole } from "@/__generated__/globalTypes";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { _NoBoxContainer ,__NoBoxSubContainer ,_NoBoxSpan ,_NoBoxCreateAffiliatedBoxButton } from "../../theme/components/_NoBox"

export const NoBox = () => {
    const { data, loading, error } = useMe();
    const history = useHistory();

    const gotoCreateAffiliatedBox = () => {
        history.push("/create-affiliated-box");
    }

    if (!data || loading || error) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }
    return(
    <__NoBoxSubContainer>
        {data.me.role === UserRole.Crossfiter && (
            <>
            <Helmet>
                <title>No Affiliated Box | CrossfiTogether</title>
            </Helmet>
            <_NoBoxSpan>
                <span>There is no Affiliated Box yet.</span>    
            </_NoBoxSpan>
        </>
        )}
        {data.me.role === UserRole.Coach && (
            <>
                <Helmet>
                    <title>No Affiliated Box | CrossfiTogether</title>
                </Helmet>
                <_NoBoxSpan>
                    <span>There is no Affiliated Box yet.</span>    
                </_NoBoxSpan>
                <_NoBoxCreateAffiliatedBoxButton onClick={gotoCreateAffiliatedBox}>Create Affiliated Box</_NoBoxCreateAffiliatedBoxButton>
            </>
        )}
    </__NoBoxSubContainer>
    )
}