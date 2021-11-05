import { ALL_BOARD_OF_RECORDS } from "@/pages/user/board-of-records";
import { _BoardCreateBoardContainer, _BoardCreateWodButton, _BoardListBox, _BoardListBoxContent, _BoardListBoxNewContent, _BoardListLayout, _BoardNoContent } from "@/theme/components/_BoardOfRecords";
import { allBoardofRecords } from "@/__generated__/allBoardofRecords";
import { useQuery } from "@apollo/client";
import Spinner from "./spinner";


interface IBorProps {
    borId:number;
}

interface IBorList {
    id:number;
    content:string;
}

export const BoardOfRecord:React.FC<IBorProps> = ({borId}) => {
    const { loading:boardofRecordLoading, data:boardofRecordList } = useQuery<allBoardofRecords>(ALL_BOARD_OF_RECORDS, {
        variables: {
            input: {
                id:borId
            }
        }
    });

    const CreateRecordInput = () => {
        console.log("hello~");
    }

    // console.log(boardofRecordList);

    return (
        <_BoardListLayout>
            <_BoardCreateBoardContainer>
                <_BoardCreateWodButton onClick={CreateRecordInput}>Create Record</_BoardCreateWodButton>
            </_BoardCreateBoardContainer>
            <_BoardListBox>
                {boardofRecordList?.allBoardofRecords.bors.length !== 0
                ? (
                    boardofRecordList?.allBoardofRecords.bors.map((bor:IBorList) => (
                        <_BoardListBoxContent> {bor.content} </_BoardListBoxContent>
                    ))
                )
                : (
                    <_BoardNoContent>Sorry, No Rep!</_BoardNoContent>
                )}
                <_BoardListBoxNewContent>여기에 새로운 리스트 생성</_BoardListBoxNewContent>
            </_BoardListBox>
            {boardofRecordLoading && 
                <Spinner />
            }
        </_BoardListLayout>
    )
}