import { useMe } from "@/hooks/useMe";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { 
    _WodListContainer, 
    _WodListSubContainer, 
    _WodListTitle, 
    _WodCreateWodButton, 
    _WodCreateWodButtonContainer, 
    _WodImg, 
    _WodImgContainer, 
    _WodImgTitle, 
    _WodNoContent, 
    _WodListContent, 
    _WodListLayout
} from "@/theme/components/_Wod"
import { allWods } from "@/__generated__/allWods";
import { UserRole } from "@/__generated__/globalTypes";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async"
import { useHistory } from "react-router-dom";

export const ALL_WODS = gql`
    query allWods {
        allWods {
            ok
            error
            wods {
                title
                content
                likes {
                    id
                }
            }
        }
    }
`;

export const Wod = () => {
    const { data, loading, error } = useMe();
    const history = useHistory();

    const { data:wods } = useQuery<allWods>(ALL_WODS);

    const gotoCreateWod = () => {
        history.push("/create-wod");
    }

    if (!data || loading || error) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }

    return(
        <>
            <Helmet>
                <title>WOD | CrossfiTogether</title>
            </Helmet>
            <_WodImgContainer>
                <_WodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_WodImg> 
                <_WodImgTitle>WOD</_WodImgTitle>
            </_WodImgContainer>
            {data.me.role == UserRole.Coach && (
                <_WodCreateWodButtonContainer>
                    <_WodCreateWodButton onClick={gotoCreateWod}>Create Wod</_WodCreateWodButton>
                </_WodCreateWodButtonContainer>
            )}
            <_WodListContainer>
                <_WodListSubContainer>
                    {wods?.allWods.wods?.length !== 0 
                    ? (
                        wods?.allWods.wods?.map((wod:any, index:any) => (
                            <_WodListLayout>
                                <_WodListTitle>{wod.title}</_WodListTitle>
                                <_WodListContent>{wod.content}</_WodListContent>
                            </_WodListLayout>
                        ))
                    )
                    : (
                        <_WodNoContent>No Rep!</_WodNoContent>
                    )}
                </_WodListSubContainer>
            </_WodListContainer>
        </>
    )
}