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
import { NamedWodsList } from "@/__generated__/globalTypes";
import { ALL_NAMED_WOD_RECORDS, ALL_ONE_RM_RECORDS } from "./leader-board-tab";
import { allNamedWodRecords } from "@/__generated__/allNamedWodRecords";
import { namedWodList } from "./leader-board-tab-enum";
import { LeaderBoardListBoxNamedWodContent } from "./leader-board-namedwod-content";
import { createNamedWodRecord, createNamedWodRecordVariables } from "@/__generated__/createNamedWodRecord";

export const CREATE_NAMED_WOD_RECORD = gql`
    mutation createNamedWodRecord($input:CreateNamedWodRecordInput!) {
        createNamedWodRecord(input:$input) {
            ok
            error
        }
    }
`;

interface ILeaderBoardContentProps {
    namedWodRecord:allNamedWodRecords|undefined;
    lbNamedWodLoading:boolean;
    namedWodState:string;
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

export const LeaderBoardListBoxNamedWod:React.FC<ILeaderBoardContentProps> = ({namedWodRecord, lbNamedWodLoading, namedWodState, userId}) => {
    const client = useApolloClient();
    const showDivRef = useRef<HTMLDivElement>(null);
    const focusRef = useRef<HTMLInputElement>(null);
    
    const onCompleted = (data:createNamedWodRecord) => {
        const { createNamedWodRecord:{ok} } = data;
        const { record } = getValues();
        const namedwodEnum:NamedWodsList =  NamedWodsList[namedWodState.split(' ').join('_') as keyof typeof NamedWodsList];
        if(ok) {
            // handleModalOpen();
            
            const existingBoards = client.readQuery({ query: ALL_NAMED_WOD_RECORDS, variables: { input: {namedWod:namedwodEnum}} });
            client.writeQuery({
                query: ALL_NAMED_WOD_RECORDS, variables: { input: {namedWod:namedwodEnum}},
                data: {
                    allNamedWodRecords: {
                        ...existingBoards.allNamedWodRecords,
                        lbNamedWods: [
                            {
                                record:+record,
                                namedWod:namedwodEnum,
                                __typename: 'AllNamedWodRecordsOutput'
                            },
                            ...existingBoards.allNamedWodRecords.lbNamedWods,
                        ],
                    },
                },
            });
        }
    }

    const [ createNamedWodRecord, { loading, data:createLbResult } ] = useMutation<createNamedWodRecord, createNamedWodRecordVariables>(CREATE_NAMED_WOD_RECORD, {
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
        const namedWodEnum:NamedWodsList =  NamedWodsList[namedWodState.split(' ').join('_') as keyof typeof NamedWodsList];
        try {
            const { record } = getValues();
            createNamedWodRecord({
                variables:{
                    input:{
                        record:+record,
                        namedWod:namedWodEnum,
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
                {namedWodRecord?.allNamedWodRecords?.lbNamedWods?.length !== 0
                ? (
                    namedWodRecord?.allNamedWodRecords?.lbNamedWods?.map((namedWod:IBorList) => (
                        <LeaderBoardListBoxNamedWodContent
                            key={namedWod.id}
                            namedwodid={namedWod.id}
                            record={namedWod.record}
                            ownername={namedWod.owner.name}
                            ownerid={namedWod.owner.id}
                            namedwodstate={namedWodState}
                            userid={userId}
                        />
                    ))
                )
                :(
                    <_LeaderBoardNoContent>Sorry, No Rep!</_LeaderBoardNoContent>
                )}
                {lbNamedWodLoading && 
                    <Spinner />
                }
            </_LeaderBoardListBox>
        </>
    )
}