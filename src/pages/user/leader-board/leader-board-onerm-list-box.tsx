import { _BoardFontAwesomeIcon, _BoardInputButton, _BoardListBoxContent, _BoardListBoxContentContainer, _BoardListBoxContentInput, _BoardListInput, _BoardListInputForm } from "@/theme/components/_BoardOfRecords"
import { faCheckSquare as faCheckSquareSolid, 
    faWindowClose as faWindowCloseSolid, 
    faCheck as faCheckSolid, 
    faTimes as faTimesSolid, 
    faPencilAlt as faPencelAltSolid ,
    faCrown as faCrownSolid
} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useRef, useState } from "react";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { editBor, editBorVariables } from "@/__generated__/editBor";
import { ALL_BOARD_OF_RECORDS } from "../board-of-record/board-of-records";
import { deleteBor, deleteBorVariables } from "@/__generated__/deleteBor";
import { _LeaderBoardCreateBoardContainer, _LeaderBoardCreateWodButton, _LeaderBoardFontAwesomeIcon, _LeaderBoardInputButton, _LeaderBoardListBox, _LeaderBoardListBoxContent, _LeaderBoardListBoxContentContainer, _LeaderBoardListBoxNewContentContainer, _LeaderBoardListInput, _LeaderBoardListInputForm, _LeaderBoardNoContent } from "@/theme/components/_LeaderBoard";
import Spinner from "@/components/spinner";
import { LeaderBoardListBoxOneRmContent } from "./leader-board-onerm-content";
import { allOneRmRecords } from "@/__generated__/allOneRmRecords";
import { createOneRmRecord, createOneRmRecordVariables } from "@/__generated__/createOneRmRecord";
import { OneRmList } from "@/__generated__/globalTypes";
import { ALL_ONE_RM_RECORDS } from "./leader-board-tab";
import JSConfetti from 'js-confetti';

export const CREATE_ONE_RM_RECORD = gql`
    mutation createOneRmRecord($input:CreateOneRmRecordInput!) {
        createOneRmRecord(input:$input) {
            ok
            error
        }
    }
`;

interface ILeaderBoardContentProps {
    oneRmRecord:allOneRmRecords|undefined;
    lbOneRmLoading:boolean;
    oneRmState:string;
    userId:number;
}

interface IBoardForm {
    record: number;
}

interface IBorList {
    id:number;
    record:number;
    owner:IOwner;
}

interface IOwner {
    id:number;
    name:string;
}

export const LeaderBoardListBoxOneRm:React.FC<ILeaderBoardContentProps> = ({oneRmRecord, lbOneRmLoading, oneRmState, userId}) => {
    const client = useApolloClient();
    const showDivRef = useRef<HTMLDivElement>(null);
    const focusRef = useRef<HTMLInputElement>(null);
    
    const onCompleted = (data:createOneRmRecord) => {
        const { createOneRmRecord:{ok} } = data;
        const { record } = getValues();
        const onermEnum:OneRmList =  OneRmList[oneRmState.split(' ').join('_') as keyof typeof OneRmList];
        if(ok) {
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
                emojis: ['👑', '🏆', '🥇', '🏅', '🥉', '🎖'],
                confettiRadius: 6,
                emojiSize: 70,
            });
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

    const handleNewInputCancel = () => {
        if(showDivRef.current) showDivRef.current.style.display = "none";
    }

    const ShowRecordInput = () => {
        if(showDivRef.current && focusRef.current) {
            showDivRef.current.style.display = "block";
            focusRef.current.value = "";
            focusRef.current.focus();
        }
    }

    const onSubmit = () => {
        const onermEnum:OneRmList =  OneRmList[oneRmState.split(' ').join('_') as keyof typeof OneRmList];
        
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

    return (
        <>
            <_LeaderBoardCreateBoardContainer>
                <_LeaderBoardCreateWodButton onClick={ShowRecordInput}>기록 추가하기</_LeaderBoardCreateWodButton>
            </_LeaderBoardCreateBoardContainer>
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
                        <LeaderBoardListBoxOneRmContent
                            key={onerm.id}
                            onermid={onerm.id}
                            record={onerm.record}
                            ownername={onerm.owner.name}
                            ownerid={onerm.owner.id}
                            onermstate={oneRmState}
                            userid={userId}
                        />
                    ))
                )
                :(
                    <_LeaderBoardNoContent>Sorry, No Rep!</_LeaderBoardNoContent>
                )}
                {lbOneRmLoading && 
                    <Spinner />
                }
            </_LeaderBoardListBox>
        </>
    )
}