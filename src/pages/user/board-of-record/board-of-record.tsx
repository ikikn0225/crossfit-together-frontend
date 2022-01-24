import { ALL_BOARD_OF_RECORDS } from "@/pages/user/board-of-record/board-of-records";
import { _BoardCreateBoardContainer, _BoardCreateWodButton, _BoardFontAwesomeIcon, _BoardInputButton, _BoardListBox, _BoardListBoxContent, _BoardListBoxContentContainer, _BoardListBoxNewContentContainer, _BoardListInput, _BoardListInputForm, _BoardListLayout, _BoardNoContent } from "@/theme/components/_BoardOfRecords";
import { allBoardofRecords } from "@/__generated__/allBoardofRecords";
import { faCheckSquare as faCheckSquareSolid, faWindowClose as faWindowCloseSolid, faCheck as faCheckSolid, faTimes as faTimesSolid, faPencilAlt as faPencelAltSolid } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useQuery, gql, useMutation, useApolloClient } from "@apollo/client";
import Spinner from "../../../components/spinner";
import { useRef } from "react";
import { createBor, createBorVariables } from "@/__generated__/createBor";
import { useForm } from "react-hook-form";
import { BoardListBoxContent } from "@/pages/user/board-of-record/board-of-record-content";
import { deleteBor, deleteBorVariables } from "@/__generated__/deleteBor";
import JSConfetti from 'js-confetti';

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
    userId:number;
}

interface IBorList {
    id:number;
    content:string;
    owner:IOwner;
}

interface IOwner {
    id:number;
}

interface IBoardForm {
    content: string;
}


export const BoardOfRecord:React.FC<IBorProps> = ({wodId, userId}) => {
    const client = useApolloClient();
    const showDivRef = useRef<HTMLDivElement>(null);
    // const editDivRef = useRef<HTMLDivElement>(null);
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
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti({
                emojis: ['👍', '🏆', '🏋️', '💪', '🏋️‍♀️'],
                confettiRadius: 6,
                emojiSize: 150,
            });
            
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
            if(showDivRef.current) showDivRef.current.style.display = "none";
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    const ShowRecordInput = () => {
        if(showDivRef.current && focusRef.current) {
            showDivRef.current.style.display = "block";
            focusRef.current.value = "";
            focusRef.current.focus();
        }
    }

    const handleNewInputCancel = () => {
        if(showDivRef.current) showDivRef.current.style.display = "none";
    }

    // console.log(boardofRecordList);

    return (
        <_BoardListLayout>
            <_BoardCreateBoardContainer>
                <_BoardCreateWodButton onClick={ShowRecordInput}>기록 추가하기</_BoardCreateWodButton>
            </_BoardCreateBoardContainer>
            <_BoardListBox>
                <_BoardListBoxNewContentContainer ref={showDivRef}>
                    <_BoardListInputForm onSubmit={handleSubmit(onSubmit)}>
                        <_BoardListInput 
                            {...register("content", {
                                required: "내용을 적어주세요",
                            })}
                            name="content"
                            placeholder="이름(기록)"
                            ref={focusRef}
                        />
                        <_BoardInputButton type="button" onClick={handleNewInputCancel}>
                            <_BoardFontAwesomeIcon icon={faTimesSolid}/>
                        </_BoardInputButton>
                        <_BoardInputButton>
                            <_BoardFontAwesomeIcon icon={faCheckSolid}/>
                        </_BoardInputButton>
                    </_BoardListInputForm>
                </_BoardListBoxNewContentContainer>
                {boardofRecordList?.allBoardofRecords.bors.length !== 0
                ? (
                    boardofRecordList?.allBoardofRecords.bors.map((bor:IBorList) => (
                        <BoardListBoxContent
                            key={bor.id}
                            borId={bor.id}
                            wodId={wodId}
                            userId={userId}
                            borOwnerId={bor.owner.id}
                            content={bor.content}
                        />
                    ))
                )
                : ( 
                    <_BoardNoContent>Sorry, No Rep!</_BoardNoContent>
                )}
            {boardofRecordLoading && 
                <Spinner />
            }
            </_BoardListBox>
        </_BoardListLayout>
    )
}