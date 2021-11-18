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

export const ALL_ONE_RM_RECORDS = gql`
    query allOneRmRecords($input:AllOneRmRecordsInput!) {
        allOneRmRecords(input:$input) {
            ok
            error
            lbOneRms {
                id
                record
                owner {
                    id
                    name
                }
            }
        }
    }
`;

export const ALL_NAMED_WOD_RECORDS = gql`
    query allNamedWodRecords($input:AllNamedWodRecordsInput!) {
        allNamedWodRecords(input:$input) {
            ok
            error
            lbNamedWods {
                id
                record
                owner {
                    id
                    name
                }
            }
        }
    }
`;

interface IBoardForm {
    record: number;
}

interface IBorList {
    id:number;
    record:number;
    owner:IOwner;
}

interface IOwner {
    name:string;
}

export const LeaderBoard = () => {
    const { data, loading, error } = useMe();
    const [menuOneRmState, setMenuOneRmState] = useState(1);
    const [menuNamedWodState, setMenuNamedWodState] = useState(0);
    const [oneRmState, setOneRmState] = useState("Clean");
    const [namedWodState, setNamedWodState] = useState("Murph");
    const highlightLiRef = useRef<HTMLUListElement>(null);

    const { data:oneRmRecord, loading:lbOneRmLoading } = useQuery<allOneRmRecords>(ALL_ONE_RM_RECORDS, {
        variables: {
            input: {
                oneRm:oneRmState.split(' ').join('_'),
            }
        }
    });

    const { data:namedWodRecord, loading:lbNamedWodLoading } = useQuery<allNamedWodRecords>(ALL_NAMED_WOD_RECORDS, {
        variables: {
            input: {
                namedWod:namedWodState.split(' ').join('_'),
            }
        }
    });


    const handleMenu = (flag:number) => {
        if(flag) {
            setMenuOneRmState(1);
            setMenuNamedWodState(0);
        } else {
            setMenuOneRmState(0);
            setMenuNamedWodState(1);
        }
    }

    const handleTabOneRmList = (oneRm:string) => {
        setOneRmState(oneRm);
    }

    const handleTabNamedWodList = (namedWod:string) => { 
        setNamedWodState(namedWod);
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
                <title>LeaderBoard | CrossfiTogether</title>
            </Helmet>
            <_LeaderBoardImgContainer>
                <_LeaderBoardImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_LeaderBoardImg> 
                <_LeaderBoardImgTitle>Leader Board</_LeaderBoardImgTitle>
            </_LeaderBoardImgContainer>
            <_LeaderBoardContainer>
                <_LeaderBoardSubContainer>
                    <_LeaderBoardTabContainer>
                        <_LeaderBoardTab active={menuOneRmState} onClick={()=>handleMenu(1)}>1 RM</_LeaderBoardTab>
                        <_LeaderBoardTab active={menuNamedWodState} onClick={()=>handleMenu(0)}>Named Wod</_LeaderBoardTab>
                        </_LeaderBoardTabContainer>
                            <_LeaderBoardTabListContainer>
                                {menuOneRmState
                                ?(
                                    oneRmList.map((oneRm)=> (
                                        <_LeaderBoardTabList oneRmList={oneRm.oneRm} oneRmState={oneRmState} key={oneRm.id} onClick={()=>handleTabOneRmList(oneRm.oneRm)} > {oneRm.oneRm} </_LeaderBoardTabList>
                                    ))
                                )
                                :(
                                    namedWodList.map((namedWod)=> (
                                        <_LeaderBoardTabList namedWodList={namedWod.namedWod} namedWodState={namedWodState} key={namedWod.id} onClick={()=>handleTabNamedWodList(namedWod.namedWod)} > {namedWod.namedWod} </_LeaderBoardTabList>
                                    ))
                                )}
                            </_LeaderBoardTabListContainer>
                        <_LeaderBoardRecordListContainer>
                        {menuOneRmState
                        ?(
                            <LeaderBoardListBoxOneRm
                                oneRmRecord={oneRmRecord}
                                lbOneRmLoading={lbOneRmLoading}
                                oneRmState={oneRmState}
                                userId={data.me.id}
                            />
                        )
                        :(
                            <LeaderBoardListBoxNamedWod
                                namedWodRecord={namedWodRecord}
                                lbNamedWodLoading={lbNamedWodLoading}
                                namedWodState={namedWodState}
                                userId={data.me.id}
                            />
                        )}
                    </_LeaderBoardRecordListContainer>
                </_LeaderBoardSubContainer>
            </_LeaderBoardContainer>
        </>
    )
}