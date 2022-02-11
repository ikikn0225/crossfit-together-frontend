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
import { ALL_ONE_RM_RECORDS } from "./leader-board-tab";
import { OneRmList } from "@/__generated__/globalTypes";
import { editOneRmRecord, editOneRmRecordVariables } from "@/__generated__/editOneRmRecord";
import { deleteOneRmRecord, deleteOneRmRecordVariables } from "@/__generated__/deleteOneRmRecord";

export const EDIT_ONE_RM_RECORDS = gql`
    mutation editOneRmRecord($input:EditOneRmRecordInput!) {
        editOneRmRecord(input:$input) {
            error
            ok
        }
    }
`;

export const DELETE_ONE_RM_RECORDS = gql`
    mutation deleteOneRmRecord($input:DeleteOneRmInput!) {
        deleteOneRmRecord(input:$input) {
            ok
            error
        }
    }
`;


interface ILeaderBoardContentProps {
    onermid:number;
    record:number;
    ownername:string;
    onermstate:string;
    userid:number;
    ownerid:number;
}

interface IBoardEditForm {
    record: number;
}


export const LeaderBoardListBoxOneRmContent:React.FC<ILeaderBoardContentProps> = ({onermid, record, ownername, onermstate, userid, ownerid}) => {
    const client = useApolloClient();
    const editFormRef = useRef<HTMLFormElement>(null);
    const checkBtnRef = useRef<HTMLButtonElement>(null);
    const editBtnRef = useRef<HTMLButtonElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    const onCompleted = (data:editOneRmRecord) => {
        const { editOneRmRecord:{ok, error} } = data;
        if(ok) {
            const onermEnum:OneRmList =  OneRmList[onermstate as keyof typeof OneRmList];
            const existingEditOneRms = client.readQuery({ query: ALL_ONE_RM_RECORDS, variables: { input: {oneRm:onermEnum}} });
            console.log(existingEditOneRms);
            
            client.writeQuery({ 
                query: ALL_ONE_RM_RECORDS, variables: { input: {oneRm:onermEnum}},
                data: {
                    allOneRmRecords: {
                        ...existingEditOneRms.allOneRmRecords,
                        lbOneRms: [ editOneRmRecord, ...existingEditOneRms.allOneRmRecords.lbOneRms
                        ],
                    },
                },
            });
        }
    }

    const [ editOneRmRecord, { loading, data:editBorResult } ] = useMutation<editOneRmRecord, editOneRmRecordVariables>(EDIT_ONE_RM_RECORDS, {
        onCompleted,
    });

    
    const [ deleteOneRmRecord, { loading:deleteLoading } ] = useMutation<deleteOneRmRecord, deleteOneRmRecordVariables>(DELETE_ONE_RM_RECORDS, {
        onCompleted({ deleteOneRmRecord }) {
            const onermEnum:OneRmList =  OneRmList[onermstate as keyof typeof OneRmList];
            const existingDeleteOneRms = client.readQuery({ query: ALL_ONE_RM_RECORDS, variables: { input: {oneRm:onermEnum}} });
            client.writeQuery({ 
                query: ALL_ONE_RM_RECORDS, variables: { input: {oneRm:onermEnum}},
                data: {
                    allOneRmRecords: {
                        ...existingDeleteOneRms.allOneRmRecords,
                        lbOneRms: [deleteOneRmRecord, ...existingDeleteOneRms.allOneRmRecords.lbOneRms
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
            editOneRmRecord({
                variables:{
                    input:{
                        record:+record,
                        oneRmId:onermid,
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

    const onClickLbDelete = async(onermid:number) => {
        if(deleteLoading === false) {
            deleteOneRmRecord({
                variables:{
                    input:{
                        oneRmId:onermid,
                    }
                }
            })
        }
    }

    return (
        <_LeaderBoardListBoxContentContainer key={onermid}>
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
                <_LeaderBoardInputButton type="button" onClick={()=>onClickLbDelete(onermid)} userId={userid} ownerid={ownerid}>
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