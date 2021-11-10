import { ALL_BOARD_OF_RECORDS } from "@/pages/user/board-of-records";
import { _BoardCreateBoardContainer, _BoardCreateWodButton, _BoardFontAwesomeIcon, _BoardInputButton, _BoardListBox, _BoardListBoxContent, _BoardListBoxNewContent, _BoardListInput, _BoardListInputForm, _BoardListLayout, _BoardNoContent } from "@/theme/components/_BoardOfRecords";
import { allBoardofRecords } from "@/__generated__/allBoardofRecords";
import { faCheckSquare as faCheckSquareSolid, faWindowClose as faWindowCloseSolid, faCheck as faCheckSolid, faTimes as faTimesSolid } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useQuery, gql, useMutation, useApolloClient } from "@apollo/client";
import Spinner from "./spinner";
import { useRef } from "react";
import { createBor, createBorVariables } from "@/__generated__/createBor";
import { useForm } from "react-hook-form";

export const CREATE_BOR = gql`
    mutation createBor($input:CreateBorInput!) {
        createBor(input:$input) {
            ok
            error
            borId
        }
    }
`;


interface IBorProps {
    wodId:number;
}

interface IBorList {
    id:number;
    content:string;
}

interface IBoardForm {
    content: string;
}


export const BoardOfRecord:React.FC<IBorProps> = ({wodId}) => {
    const client = useApolloClient();
    const showDivRef = useRef<HTMLDivElement>(null);
    const focusRef = useRef<HTMLInputElement>(null);
    const { loading:boardofRecordLoading, data:boardofRecordList } = useQuery<allBoardofRecords>(ALL_BOARD_OF_RECORDS, {
        variables: {
            input: {
                id:wodId
            }
        }
    });

    const onCompleted = (data:createBor) => {
        const { createBor:{ok, borId} } = data;
        const { content } = getValues();
        if(ok) {
            // handleModalOpen();
            
        const existingBoards = client.readQuery({ query: ALL_BOARD_OF_RECORDS, variables: { input: {id:wodId}} });
        client.writeQuery({
            query: ALL_BOARD_OF_RECORDS, variables: { input: {id:wodId}},
            data: {
                allBoardofRecords: {
                    ...existingBoards.allBoardofRecords,
                    bors: [
                        {
                            id:borId,
                            content,
                            wodId,
                            __typename: 'Bor'
                        },
                        ...existingBoards.allBoardofRecords.bors,
                    ],
                },
            },
        });
        console.log("existingBoards", existingBoards);
        
        }
    }

    const [ createBor, { loading, data:createBorResult } ] = useMutation<createBor, createBorVariables>(CREATE_BOR, {
        onCompleted,
    });

    const { register, control, getValues, formState: { errors }, handleSubmit, formState } = useForm<IBoardForm>({
        mode:"onChange",
    });

    const onSubmit = () => {
        try {
            const { content } = getValues();
            createBor({
                variables:{
                    input:{
                        content,
                        wodId,
                    }
                },
            });
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    const ShowRecordInput = () => {
        if(showDivRef.current && focusRef.current) {
            showDivRef.current.style.display = "block";
            focusRef.current.focus();
        }
    }

    // console.log(boardofRecordList);

    return (
        <_BoardListLayout>
            <_BoardCreateBoardContainer>
                <_BoardCreateWodButton onClick={ShowRecordInput}>Create Record</_BoardCreateWodButton>
            </_BoardCreateBoardContainer>
            <_BoardListBox>
                {boardofRecordList?.allBoardofRecords.bors.length !== 0
                ? (
                    boardofRecordList?.allBoardofRecords.bors.map((bor:IBorList) => (
                        <_BoardListBoxContent key={bor.id}> {bor.content} </_BoardListBoxContent>
                    ))
                )
                : ( 
                    <_BoardNoContent>Sorry, No Rep!</_BoardNoContent>
                )}
                <_BoardListBoxNewContent ref={showDivRef}>
                    <_BoardListInputForm onSubmit={handleSubmit(onSubmit)}>
                        <_BoardListInput 
                            {...register("content", {
                                required: "Content is required",
                            })}
                            name="content"
                            ref={focusRef}
                        />
                        <_BoardInputButton checkprop="1">
                            <_BoardFontAwesomeIcon icon={faTimesSolid}/>
                        </_BoardInputButton>
                        <_BoardInputButton  checkprop="0">
                            <_BoardFontAwesomeIcon icon={faCheckSolid}/>
                        </_BoardInputButton>
                    </_BoardListInputForm>
                </_BoardListBoxNewContent>
            </_BoardListBox>
            {boardofRecordLoading && 
                <Spinner />
            }
        </_BoardListLayout>
    )
}