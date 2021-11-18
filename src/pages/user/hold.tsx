import { _HoldImg, _HoldImgContainer, _HoldImgTitle, _HoldContainer, _HoldSubContainer } from "@/theme/_Hold"
import { Helmet } from "react-helmet-async"


export const Hold = () => {
    return(
        <>
            <Helmet>
                <title>Hold | CrossfiTogether</title>
            </Helmet>
            <_HoldImgContainer>
                <_HoldImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_HoldImg> 
                <_HoldImgTitle>Leader Board</_HoldImgTitle>
            </_HoldImgContainer>
            <_HoldContainer>
                <_HoldSubContainer>

                </_HoldSubContainer>
            </_HoldContainer>
        </>
    )
}