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
import { LeaderBoardListBoxContent } from "./leader-board-content";

export const ALL_ONE_RM_RECORDS = gql`
    query allOneRmRecords($input:AllOneRmRecordsInput!) {
        allOneRmRecords(input:$input) {
            ok
            error
            lbOneRms {
                id
                record
                owner {
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
                    name
                }
            }
        }
    }
`;

export const CREATE_ONE_RM_RECORD = gql`
    mutation createOneRmRecord($input:CreateOneRmRecordInput!) {
        createOneRmRecord(input:$input) {
            ok
            error
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
    const client = useApolloClient();
    const showDivRef = useRef<HTMLDivElement>(null);
    const focusRef = useRef<HTMLInputElement>(null);
    const [menuOneRmState, setMenuOneRmState] = useState(1);
    const [menuNamedWodState, setMenuNamedWodState] = useState(0);
    const [oneRmState, setOneRmState] = useState("Clean");
    const [namedWodState, setNamedWodState] = useState("Murph");

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
                oneRm:namedWodState.split(' ').join('_'),
            }
        }
    });

    const onCompleted = (data:createOneRmRecord) => {
        const { createOneRmRecord:{ok} } = data;
        const { record } = getValues();
        const onermEnum:OneRmList =  OneRmList[oneRmState as keyof typeof OneRmList];
        if(ok) {
            // handleModalOpen();
            
        const existingBoards = client.readQuery({ query: ALL_ONE_RM_RECORDS, variables: { input: {oneRm:onermEnum}} });
        client.writeQuery({
            query: ALL_ONE_RM_RECORDS, variables: { input: {oneRm:onermEnum}},
            data: {
                allOneRmRecords: {
                    ...existingBoards.allOneRmRecords,
                    lbOneRms: [
                        {
                            record:+record,
                            oneRm:onermEnum,
                            __typename: 'AllOneRmRecordsOutput'
                        },
                        ...existingBoards.allOneRmRecords.lbOneRms,
                    ],
                },
            },
        });
        }
    }

    const [ createOneRmRecord, { loading, data:createLbResult } ] = useMutation<createOneRmRecord, createOneRmRecordVariables>(CREATE_ONE_RM_RECORD, {
        onCompleted,
    });

    const { register, control, getValues, formState: { errors }, handleSubmit, formState } = useForm<IBoardForm>({
        mode:"onChange",
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

    const ShowRecordInput = () => {
        if(showDivRef.current && focusRef.current) {
            showDivRef.current.style.display = "block";
            focusRef.current.focus();
        }
    }

    const handleNewInputCancel = () => {
        if(showDivRef.current) showDivRef.current.style.display = "none";
    }

    const handleTabOneRmList = (oneRm:string) => {
        console.log("oneRm", oneRm);   
        setOneRmState(oneRm);
    }

    const handleTabNamedWodList = (namedWod:string) => { 
        setNamedWodState(namedWod);
    }

    const onSubmit = () => {
        const onermEnum:OneRmList =  OneRmList[oneRmState as keyof typeof OneRmList];
        try {
            const { record } = getValues();
            createOneRmRecord({
                variables:{
                    input:{
                        record:+record,
                        oneRm:onermEnum,
                    }
                },
            });
            if(showDivRef.current) showDivRef.current.style.display = "none";
        } catch (e:any) {
            console.log(e.response.data);
        }
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
                                <_LeaderBoardTabList key={oneRm.id} onClick={()=>handleTabOneRmList(oneRm.oneRm)} > {oneRm.oneRm} </_LeaderBoardTabList>
                            ))
                        )
                        :(
                            namedWodList.map((namedWod)=> (
                                <_LeaderBoardTabList key={namedWod.id} onClick={()=>handleTabNamedWodList(namedWod.namedWod)} > {namedWod.namedWod} </_LeaderBoardTabList>
                            ))
                        )}
                    </_LeaderBoardTabListContainer>
                    <_LeaderBoardRecordListContainer>
                        <_LeaderBoardCreateBoardContainer>
                            <_LeaderBoardCreateWodButton onClick={ShowRecordInput}>Create Record</_LeaderBoardCreateWodButton>
                        </_LeaderBoardCreateBoardContainer>
                        {/* onearm이냐 namedWod냐에 따라 아래 _LeaderBoardListBox를 기준으로 컴포넌트를 나눠야할듯 */}
                        <_LeaderBoardListBox>
                            <_LeaderBoardListBoxNewContentContainer ref={showDivRef}>
                                <_LeaderBoardListInputForm onSubmit={handleSubmit(onSubmit)} >
                                    <_LeaderBoardListInput 
                                        {...register("record", {
                                            required: "Content is required",
                                        })}
                                        name="record"
                                        placeholder="Record"
                                        ref={focusRef}
                                    />
                                    <_LeaderBoardInputButton type="button" onClick={handleNewInputCancel}>
                                        <_LeaderBoardFontAwesomeIcon icon={faTimesSolid}/>
                                    </_LeaderBoardInputButton>
                                    <_LeaderBoardInputButton>
                                        <_LeaderBoardFontAwesomeIcon icon={faCheckSolid}/>
                                    </_LeaderBoardInputButton>
                                </_LeaderBoardListInputForm>
                            </_LeaderBoardListBoxNewContentContainer>
                            {oneRmRecord?.allOneRmRecords?.lbOneRms?.length !== 0
                            ? (
                                oneRmRecord?.allOneRmRecords?.lbOneRms?.map((onerm:IBorList) => (
                                    <LeaderBoardListBoxContent
                                        key={onerm.id}
                                        onermid={onerm.id}
                                        record={onerm.record}
                                        ownername={onerm.owner.name}
                                    />
                                    // <span>{onerm.record}</span>
                                ))
                            )
                            :(
                                <_LeaderBoardNoContent>Sorry, No Rep!</_LeaderBoardNoContent>
                            )}
                            {namedWodRecord?.allNamedWodRecords?.lbNamedWods?.length !== 0
                            ? (
                                namedWodRecord?.allNamedWodRecords?.lbNamedWods?.map((namedWod:IBorList) => (
                                    <span>{namedWod.record}</span>
                                ))
                            )
                            :(
                                <_LeaderBoardNoContent>Sorry, No Rep!</_LeaderBoardNoContent>
                            )}
                        {lbOneRmLoading && 
                            <Spinner />
                        }
                        </_LeaderBoardListBox>
                    </_LeaderBoardRecordListContainer>
                </_LeaderBoardSubContainer>
            </_LeaderBoardContainer>
        </>
    )
}