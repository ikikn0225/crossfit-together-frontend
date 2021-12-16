import { _LeaderBoardImg, _LeaderBoardImgContainer, _LeaderBoardImgTitle, _LeaderBoardContainer, _LeaderBoardTabContainer, _LeaderBoardTab, _LeaderBoardSubContainer, _LeaderBoardTabListContainer, _LeaderBoardTabList, _LeaderBoardRecordListContainer, _LeaderBoardCreateBoardContainer, _LeaderBoardCreateWodButton, _LeaderBoardListBox, _LeaderBoardListBoxNewContentContainer, _LeaderBoardListInputForm, _LeaderBoardListInput, _LeaderBoardInputButton, _LeaderBoardFontAwesomeIcon, _LeaderBoardNoContent } from "@/theme/components/_LeaderBoard"
import { allNamedWodRecords } from "@/__generated__/allNamedWodRecords";
import { allOneRmRecords } from "@/__generated__/allOneRmRecords";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet-async"
import { namedWodList, oneRmList } from "./leader-board-tab-enum";
import { LeaderBoardTabNamedWod } from "./leader-board-tab-namedwod";
import { LeaderBoardTabOneRm } from "./leader-board-tab-onerm";
import gql from "graphql-tag";
import Spinner from "@/components/spinner";
import { useForm } from "react-hook-form";
import { faCheckSquare as faCheckSquareSolid, 
    faWindowClose as faWindowCloseSolid, 
    faCheck as faCheckSolid, 
    faTimes as faTimesSolid, 
    faPencilAlt as faPencelAltSolid,
    faCrown as faCrownSolid
} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { createOneRmRecord, createOneRmRecordVariables } from "@/__generated__/createOneRmRecord";
import { OneRmList } from "@/__generated__/globalTypes";
import { LeaderBoardListBoxOneRm } from "./leader-board-onerm-list-box";
import { LeaderBoardListBoxNamedWod } from "./leader-board-namedwod-list-box";
import { useMe } from "@/hooks/useMe";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { LeaderBoardTab } from "./leader-board-tab";

export const LeaderBoard = () => {
    const { data, loading, error } = useMe();

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
                <title>LeaderBoard | CrossfiTogether</title>
            </Helmet>
            <_LeaderBoardImgContainer>
                <_LeaderBoardImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_LeaderBoardImg> 
                <_LeaderBoardImgTitle>운동별 순위</_LeaderBoardImgTitle>
            </_LeaderBoardImgContainer>
            <_LeaderBoardContainer>
                <_LeaderBoardSubContainer>
                    <LeaderBoardTab me={data.me} />
                </_LeaderBoardSubContainer>
            </_LeaderBoardContainer>
        </>
    )
}