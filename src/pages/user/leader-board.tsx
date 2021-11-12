import { _LeaderBoardImg, _LeaderBoardImgContainer, _LeaderBoardImgTitle } from "@/theme/components/_LeaderBoard"
import { Helmet } from "react-helmet-async"


export const LeaderBoard = () => {
    return(
        <>
            <Helmet>
                <title>LeaderBoard | CrossfiTogether</title>
            </Helmet>
            <_LeaderBoardImgContainer>
                <_LeaderBoardImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_LeaderBoardImg> 
                <_LeaderBoardImgTitle>Leader Board</_LeaderBoardImgTitle>
            </_LeaderBoardImgContainer>
        </>
    )
}