import { _BoardFontAwesomeIcon, _BoardInputButton, _BoardListBoxContent, _BoardListBoxContentContainer, _BoardListBoxContentInput, _BoardListInput, _BoardListInputForm } from "@/theme/components/_BoardOfRecords"
import { faCheckSquare as faCheckSquareSolid, 
    faWindowClose as faWindowCloseSolid, 
    faCheck as faCheckSolid, 
    faTimes as faTimesSolid, 
    faPencilAlt as faPencelAltSolid ,
    faCrown as faCrownSolid
} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { editBor, editBorVariables } from "@/__generated__/editBor";
import { ALL_BOARD_OF_RECORDS } from "../board-of-record/board-of-records";
import { deleteBor, deleteBorVariables } from "@/__generated__/deleteBor";
import { _LeaderBoardFontAwesomeIcon, _LeaderBoardFontAwesomeIconContainer, _LeaderBoardInputButton, _LeaderBoardListBoxContent, _LeaderBoardListBoxContentContainer, _LeaderBoardListBoxContentInput, _LeaderBoardListInputForm } from "@/theme/components/_LeaderBoard";
import { ALL_NAMED_WOD_RECORDS, ALL_ONE_RM_RECORDS } from "./leader-board-tab";
import { editNamedWodRecord, editNamedWodRecordVariables } from "@/__generated__/editNamedWodRecord";
import { NamedWodsList } from "@/__generated__/globalTypes";
import { deleteNamedWodRecord, deleteNamedWodRecordVariables } from "@/__generated__/deleteNamedWodRecord";

export const EDIT_NAMED_WOD_RECORDS = gql`
    mutation editNamedWodRecord($input:EditNamedWodRecordInput!) {
        editNamedWodRecord(input:$input) {
            error
            ok
        }
    }
`;

export const DELETE_NAMED_WOD_RECORDS = gql`
    mutation deleteNamedWodRecord($input:DeleteNamedWodInput!) {
        deleteNamedWodRecord(input:$input) {
            ok
            error
        }
    }
`;

interface ILeaderBoardContentProps {
    namedwodid:number;
    record:number;
    ownername:string;
    namedwodstate:string;
    userid:number;
    ownerid:number;
}

interface IBoardEditForm {
    record: number;
}


export const LeaderBoardListBoxNamedWodContent:React.FC<ILeaderBoardContentProps> = ({namedwodid, record, ownername, namedwodstate, userid, ownerid}) => {
    const client = useApolloClient();
    const editFormRef = useRef<HTMLFormElement>(null);
    const checkBtnRef = useRef<HTMLButtonElement>(null);
    const editBtnRef = useRef<HTMLButtonElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    const onCompleted = (data:editNamedWodRecord) => {
        const { editNamedWodRecord:{ok, error} } = data;
        if(ok) {
            const namedwodEnum:NamedWodsList =  NamedWodsList[namedwodstate.split(' ').join('_') as keyof typeof NamedWodsList];
            const existingBoards = client.readQuery({ query: ALL_NAMED_WOD_RECORDS, variables: { input: {namedWod:namedwodEnum}} });
            client.writeQuery({ 
                query: ALL_NAMED_WOD_RECORDS, variables: { input: {namedWod:namedwodEnum}},
                data: {
                    allNamedWodRecords: {
                        ...existingBoards.allNamedWodRecords,
                        lbNamedWods: [ editNamedWodRecord, ...existingBoards.allNamedWodRecords.lbNamedWods
                        ],
                    },
                },
            });
        }
    }

    const [ editNamedWodRecord, { loading, data:editBorResult } ] = useMutation<editNamedWodRecord, editNamedWodRecordVariables>(EDIT_NAMED_WOD_RECORDS, {
        onCompleted,
    });

    
    const [ deleteNamedWodRecord, { loading:deleteLoading } ] = useMutation<deleteNamedWodRecord, deleteNamedWodRecordVariables>(DELETE_NAMED_WOD_RECORDS, {
        onCompleted({ deleteNamedWodRecord }) {
            const namedwodEnum:NamedWodsList =  NamedWodsList[namedwodstate.split(' ').join('_') as keyof typeof NamedWodsList];
            const existingBoards = client.readQuery({ query: ALL_NAMED_WOD_RECORDS, variables: { input: {namedWod:namedwodEnum}} });
            client.writeQuery({ 
                query: ALL_NAMED_WOD_RECORDS, variables: { input: {namedWod:namedwodEnum}},
                data: {
                    allNamedWodRecords: {
                        ...existingBoards.allNamedWodRecords,
                        lbNamedWods: [deleteNamedWodRecord, ...existingBoards.allNamedWodRecords.lbNamedWods
                        ],
                    },
                },
            });
        }
    })


    const { register, control, getValues, formState: { errors }, handleSubmit, formState } = useForm<IBoardEditForm>({
        mode:"onChange",
    });
    
    const onSubmit = () => {
        try {
            const { record } = getValues();
            editNamedWodRecord({
                variables:{
                    input:{
                        record:+record,
                        namedWodId:namedwodid,
                    }
                },
            });
            if(editFormRef.current && checkBtnRef.current && editBtnRef.current && editInputRef.current) {
                checkBtnRef.current.style.display = "none";
                editInputRef.current.style.display = "none";
                editBtnRef.current.style.display = 'inline-block';
                editFormRef.current.children[1].setAttribute("style", "display:inline-block;");
                editFormRef.current.children[2].setAttribute("style", "display:inline-block;");
            }
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    const handleEditInput = (record:number) => {
        if(editFormRef.current && checkBtnRef.current && editBtnRef.current && editInputRef.current) {
            checkBtnRef.current.style.display = 'block';
            editInputRef.current.style.display = 'inline-block';
            editInputRef.current.style.margin = '1rem';
            editBtnRef.current.style.display = 'none';
            editFormRef.current.children[1].setAttribute("style", "display:none;");
            editFormRef.current.children[2].setAttribute("style", "display:none;");
            editInputRef.current.value = record.toString();
        }
    }

    const onClickLbDelete = async(namedwodid:number) => {
        if(deleteLoading === false) {
            deleteNamedWodRecord({
                variables:{
                    input:{
                        namedWodId:namedwodid,
                    }
                }
            })
        }
    }

    return (
        <_LeaderBoardListBoxContentContainer key={namedwodid}>
            <_LeaderBoardListInputForm onSubmit={handleSubmit(onSubmit)} ref={editFormRef}>
                <_LeaderBoardFontAwesomeIconContainer crown={true}>
                    <_LeaderBoardFontAwesomeIcon icon={faCrownSolid}/>
                </_LeaderBoardFontAwesomeIconContainer>
                <_LeaderBoardListBoxContent record={record}>{record}</_LeaderBoardListBoxContent>
                <span>LB</span>
                <_LeaderBoardListBoxContentInput
                    {...register("record", {
                        required: "Record is required",
                    })}
                    name="record"
                    ref={editInputRef}
                />
                <_LeaderBoardInputButton type="button" onClick={()=>onClickLbDelete(namedwodid)} userId={userid} ownerid={ownerid}>
                    <_LeaderBoardFontAwesomeIcon icon={faTimesSolid}/>
                </_LeaderBoardInputButton>
                <_LeaderBoardInputButton type="button" onClick={() => handleEditInput(record)} ref={editBtnRef} userId={userid} ownerid={ownerid}>
                    <_LeaderBoardFontAwesomeIcon icon={faPencelAltSolid}/>
                </_LeaderBoardInputButton>
                <_LeaderBoardInputButton userId={userid} ownerid={ownerid} editCheck={true} ref={checkBtnRef}>
                    <_LeaderBoardFontAwesomeIcon icon={faCheckSolid}/>
                </_LeaderBoardInputButton>
                <_LeaderBoardListBoxContent>{ownername}</_LeaderBoardListBoxContent>
            </_LeaderBoardListInputForm>
        </_LeaderBoardListBoxContentContainer>
    )
}