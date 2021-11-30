import { _MyPageListBoxContent, _MyPageListBoxContentContainer, _MyPageListBoxContentLayout, _MyPageWodDateSpan } from "@/theme/components/_MyPage";
import { myBoardofRecords } from "@/__generated__/myBoardofRecords";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const MY_BOARD_OF_RECORDS = gql`
query myBoardofRecords($input:MyBoardofRecordInput!) {
    myBoardofRecords(input:$input) {
        ok
        error
        bors {
            id
            content
            owner {
                id
                name
            }
            wod {
                id
                title
            }
        }
    }
}
`;

interface IMyPageBoardOfRecordContent {
    wodId:number;
}

interface IMyPageBorList {
    id:number;
    content:string;
    owner:IOwner;
    wod:IWod;
}

interface IOwner {
    id:number;
}

interface IWod {
    id:number;
    title:string;
}

export const MyPageBoardOfRecordContent:React.FC<IMyPageBoardOfRecordContent> = ({wodId}) => {
        const { data:myBoardofRecord, loading:myBoardofRecordLoading } = useQuery<myBoardofRecords>(MY_BOARD_OF_RECORDS, {
        variables: {
            input: {
                id:wodId
            }
        }
    });
    
    return(
        <>
            {myBoardofRecord?.myBoardofRecords.bors.length !== 0 
            &&(
                myBoardofRecord?.myBoardofRecords.bors.map((bor:IMyPageBorList) => (
                    bor.id !== undefined &&(
                        <_MyPageListBoxContentContainer key={bor.id} myPageContent={"mypage"}>
                            <_MyPageListBoxContentLayout key={bor.id}>
                                <_MyPageWodDateSpan>{bor.wod.title}</_MyPageWodDateSpan>
                                <_MyPageListBoxContent >Your Record : </_MyPageListBoxContent>
                                <_MyPageListBoxContent record={bor.id}>{bor.content}</_MyPageListBoxContent>
                            </_MyPageListBoxContentLayout>

                        </_MyPageListBoxContentContainer>
                    )
                ))
            )}
        </>
    )
}