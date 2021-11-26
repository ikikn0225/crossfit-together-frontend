import { _MyPageLeaderBoardTitle, _MyPageListBoxContent, _MyPageListBoxContentContainer, _MyPageNoContent } from "@/theme/components/_MyPage";
import { myNamedWodRecords } from "@/__generated__/myNamedWodRecords";
import { myOneRmRecords } from "@/__generated__/myOneRmRecords";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { LeaderBoardTabContainer } from "../leader-board/leader-board-tab-container";
import gql from "graphql-tag";

export const MY_ONE_RM_RECORDS = gql`
query myOneRmRecords($input:MyOneRmRecordsInput!) {
    myOneRmRecords(input:$input) {
        ok
        error
        lbOneRms {
            id
            record
            owner {
                id
                name
            }
        }
    }
}
`;

export const MY_NAMED_WOD_RECORDS = gql`
query myNamedWodRecords($input:MyNamedWodRecordsInput!) {
    myNamedWodRecords(input:$input) {
        ok
        error
        lbNamedWods {
            id
            record
            owner {
                id
                name
            }
        }
    }
}
`;

interface ISpan {
    title:string;
}
export const MyPageLeaderBoard:React.FC<ISpan> = ({title}) => {

    const [menuOneRmState, setMenuOneRmState] = useState(1);
    const [menuNamedWodState, setMenuNamedWodState] = useState(0);
    const [oneRmState, setOneRmState] = useState("Clean");
    const [namedWodState, setNamedWodState] = useState("Murph");

    const { data:myOneRmRecord, loading:lbOneRmLoading } = useQuery<myOneRmRecords>(MY_ONE_RM_RECORDS, {
        variables: {
            input: {
                oneRm:oneRmState.split(' ').join('_'),
            }
        }
    });

    const { data:myNamedWodRecord, loading:lbNamedWodLoading } = useQuery<myNamedWodRecords>(MY_NAMED_WOD_RECORDS, {
        variables: {
            input: {
                namedWod:namedWodState.split(' ').join('_'),
            }
        }
    });

    return(
        <>
            <_MyPageLeaderBoardTitle>{title}</_MyPageLeaderBoardTitle>
            <LeaderBoardTabContainer
                menuOneRmState={menuOneRmState}
                menuNamedWodState={menuNamedWodState}
                oneRmState={oneRmState}
                namedWodState={namedWodState}
                setOneRmState={setOneRmState}
                setNamedWodState={setNamedWodState}
                setMenuOneRmState={setMenuOneRmState}
                setMenuNamedWodState={setMenuNamedWodState}
            />
            {menuOneRmState
            ?(
                myOneRmRecord?.myOneRmRecords.lbOneRms !== undefined && myOneRmRecord?.myOneRmRecords.lbOneRms !== null
                ? (

                    <_MyPageListBoxContentContainer>
                        <_MyPageListBoxContent>Your <span>{oneRmState}</span> Record :  </_MyPageListBoxContent>
                        <_MyPageListBoxContent record={myOneRmRecord?.myOneRmRecords.lbOneRms.record}>{myOneRmRecord?.myOneRmRecords.lbOneRms.record}</_MyPageListBoxContent>
                        <span>LB</span>
                    </_MyPageListBoxContentContainer>
                )
                :(
                    <_MyPageNoContent>Sorry, No Rep!</_MyPageNoContent>
                )
            )
            :(
                myNamedWodRecord?.myNamedWodRecords.lbNamedWods !== undefined && myNamedWodRecord?.myNamedWodRecords.lbNamedWods !== null
                    ? (

                        <_MyPageListBoxContentContainer>
                            <_MyPageListBoxContent>Your <span>{namedWodState}</span> Record :  </_MyPageListBoxContent>
                            <_MyPageListBoxContent record={myNamedWodRecord?.myNamedWodRecords.lbNamedWods.record}>{myNamedWodRecord?.myNamedWodRecords.lbNamedWods.record}</_MyPageListBoxContent>
                            {/* <span>LB</span> */}
                        </_MyPageListBoxContentContainer>
                    )
                    :(
                        <_MyPageNoContent>Sorry, No Rep!</_MyPageNoContent>
                    )
            )}
        </>
    )
}