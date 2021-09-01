import { _UpdateWodImg, _UpdateWodImgContainer, _UpdateWodImgTitle } from "@/theme/components/_UpdateWod"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

interface IParams {
    id: string;
}

export const UpdateWod = () => {
    const {id} = useParams<IParams>();
    
    return (
        <>
            <Helmet>
                <title>Update Wod | CrossfiTogether</title>
            </Helmet>
            <_UpdateWodImgContainer>
                <_UpdateWodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_UpdateWodImg> 
                <_UpdateWodImgTitle>Update WOD</_UpdateWodImgTitle>
            </_UpdateWodImgContainer>
        </>
    )
}