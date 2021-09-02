import { _UpdateWodImg, _UpdateWodImgContainer, _UpdateWodImgTitle } from "@/theme/components/_UpdateWod"
import { allWods } from "@/__generated__/allWods";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { ALL_WODS } from "./wod";

export const WOD_QUERY = gql `
    query wod($input:OneWodInput!) {
        wod(input:$input) {
            ok
            error
            wod {
                id
                title
                content
                titleDate
                likes {
                    id
                }
            }
        }
    }
`;


interface IParams {
    id: string;
}

export const UpdateWod = () => {
    const {id} = useParams<IParams>();
    const { data:wods } = useQuery<allWods>(ALL_WODS);
    // const {data} = useQuery<myRestaurant, myRestaurantVariables>(
    //     WOD_QUERY,
    //     {
    //         variables: {
    //             input: {
    //                 id:+id,
    //             },
    //         },
    //     }
    // );
    
    return (
        <>
            <Helmet>
                <title>Update Wod | CrossfiTogether</title>
            </Helmet>
            <_UpdateWodImgContainer>
                <_UpdateWodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_UpdateWodImg> 
                <_UpdateWodImgTitle>Edit WOD</_UpdateWodImgTitle>
            </_UpdateWodImgContainer>
        </>
    )
}