import { _BoardFontAwesomeIcon, _BoardInputButton, _BoardListBoxContent, _BoardListBoxContentContainer, _BoardListBoxContentInput, _BoardListInput, _BoardListInputForm } from "@/theme/components/_BoardOfRecords"
import { faCheckSquare as faCheckSquareSolid, faWindowClose as faWindowCloseSolid, faCheck as faCheckSolid, faTimes as faTimesSolid, faPencilAlt as faPencelAltSolid } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { editBor, editBorVariables } from "@/__generated__/editBor";
import { ALL_BOARD_OF_RECORDS } from "./board-of-records";
import { deleteBor, deleteBorVariables } from "@/__generated__/deleteBor";

export const EDIT_BOR = gql`
    mutation editBor($input:EditBorInput!) {
        editBor(input:$input) {
            error
            ok
        }
    }
`;

export const DELETE_BOR = gql`
    mutation deleteBor($input:DeleteBorInput!) {
        deleteBor(input:$input) {
            ok
            error
        }
    }
`;


interface IBorEditContentProps {
    borId:number;
    userId:number;
    wodId:number;
    borOwnerId:number;
    content:string;
}

interface IBoardEditForm {
    content: string;
}


export const BoardListBoxContent:React.FC<IBorEditContentProps> = ({borId, wodId, userId, borOwnerId, content}) => {
    const client = useApolloClient();
    const editFormRef = useRef<HTMLFormElement>(null);
    const checkBtnRef = useRef<HTMLButtonElement>(null);
    const editBtnRef = useRef<HTMLButtonElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    const onCompleted = (data:editBor) => {
        const { editBor:{ok, error} } = data;
        if(ok) {
            const existingBoards = client.readQuery({ query: ALL_BOARD_OF_RECORDS, variables: { input: {id:wodId}} });
            client.writeQuery({ 
                query: ALL_BOARD_OF_RECORDS, variables: { input: {id:wodId}},
                data: {
                    allBoardofRecords: {
                        ...existingBoards.allBoardofRecords,
                        bors: [ editBor, ...existingBoards.allBoardofRecords.bors
                        ],
                    },
                },
            });
        }
    }

    const [ editBor, { loading, data:editBorResult } ] = useMutation<editBor, editBorVariables>(EDIT_BOR, {
        onCompleted,
    });

    
    const [ deleteBor, { loading:deleteLoading } ] = useMutation<deleteBor, deleteBorVariables>(DELETE_BOR, {
        onCompleted({ deleteBor }) {
            const existingBoards = client.readQuery({ query: ALL_BOARD_OF_RECORDS, variables: { input: {id:wodId}} });
            client.writeQuery({ 
                query: ALL_BOARD_OF_RECORDS, variables: { input: {id:wodId}},
                data: {
                    allBoardofRecords: {
                        ...existingBoards.allBoardofRecords,
                        bors: [deleteBor, ...existingBoards.allBoardofRecords.bors
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
            const { content } = getValues();
            editBor({
                variables:{
                    input:{
                        content,
                        borId,
                    }
                },
            });
            if(editFormRef.current && checkBtnRef.current && editBtnRef.current && editInputRef.current) {
                checkBtnRef.current.style.display = "none";
                editInputRef.current.style.display = "none";
                editBtnRef.current.style.display = 'inline';
                editFormRef.current.children[0].setAttribute("style", "display:inline;");
            }
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    const handleEditInput = (content:string) => {
        if(editFormRef.current && checkBtnRef.current && editBtnRef.current && editInputRef.current) {
            checkBtnRef.current.style.display = 'inline';
            editInputRef.current.style.display = 'inline';
            editBtnRef.current.style.display = 'none';
            editFormRef.current.children[0].setAttribute("style", "display:none;");
            editInputRef.current.value = content;
        }
    }

    const onClickRecordDelete = async(borId:number) => {
        if(deleteLoading === false) {
            deleteBor({
                variables:{
                    input:{
                        id:borId,
                    }
                }
            })
        }
    }

    return (
        <_BoardListBoxContentContainer key={borId}>
            <_BoardListInputForm onSubmit={handleSubmit(onSubmit)} ref={editFormRef}>
                <_BoardListBoxContent>{content}</_BoardListBoxContent>
                <_BoardListBoxContentInput
                    {...register("content", {
                        required: "내용을 적어주세요",
                    })}
                    name="content"
                    ref={editInputRef}
                />
                <_BoardInputButton type="button" onClick={()=>onClickRecordDelete(borId)} userId={userId} borOwnerId={borOwnerId}>
                    <_BoardFontAwesomeIcon icon={faTimesSolid}/>
                </_BoardInputButton>
                <_BoardInputButton type="button" onClick={() => handleEditInput(content)} ref={editBtnRef} userId={userId} borOwnerId={borOwnerId}>
                    <_BoardFontAwesomeIcon icon={faPencelAltSolid}/>
                </_BoardInputButton>
                <_BoardInputButton userId={userId} borOwnerId={borOwnerId} editCheck={true} ref={checkBtnRef}>
                    <_BoardFontAwesomeIcon icon={faCheckSolid}/>
                </_BoardInputButton>
            </_BoardListInputForm>
        </_BoardListBoxContentContainer>
    )
}