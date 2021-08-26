import { _WodImg, _WodImgContainer, _WodImgTitle } from "@/theme/components/_Wod"
import { Helmet } from "react-helmet-async"


export const Wod = () => {
    return(
        <>
            <Helmet>
                <title>WOD | CrossfiTogether</title>
            </Helmet>
            <_WodImgContainer>
                <_WodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_WodImg> 
                <_WodImgTitle>WOD</_WodImgTitle>
            </_WodImgContainer>
        </>
    )
}