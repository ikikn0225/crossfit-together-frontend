import { _MyPageLeaderBoardContentContainer, _MyPageTitle, _MyPageListBoxContent, _MyPageListBoxContentContainer, _MyPageNoContent } from "@/theme/components/_MyPage";
import { myNamedWodRecords } from "@/__generated__/myNamedWodRecords";
import { myOneRmRecords } from "@/__generated__/myOneRmRecords";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { LeaderBoardTabContainer } from "../leader-board/leader-board-tab-container";
import gql from "graphql-tag";
import { _LeaderBoardFontAwesomeIcon, _LeaderBoardListMore, _ToggleButton } from "@/theme/components/_LeaderBoard";
import { 
    faSortDown as faSortDownSolid, 
    faSortUp as faSortUpSolid, 
} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";

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

export const MyPageLeaderBoard = () => {

    const [menuOneRmState, setMenuOneRmState] = useState(1);
    const [menuNamedWodState, setMenuNamedWodState] = useState(0);
    const [oneRmState, setOneRmState] = useState("Clean");
    const [namedWodState, setNamedWodState] = useState("Murph");
    const [tabToggleState, setTabToggleState] = useState("close");

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

    const handleTabListToggle = (toggle:string) => {
        if(toggle == "open")        setTabToggleState("close");
        else if(toggle == "close")  setTabToggleState("open");
    }

    return(
        <>
            <_MyPageTitle>Leader Board</_MyPageTitle>
            <_MyPageLeaderBoardContentContainer>
                <LeaderBoardTabContainer
                    toggle={tabToggleState}
                    menuOneRmState={menuOneRmState}
                    menuNamedWodState={menuNamedWodState}
                    oneRmState={oneRmState}
                    namedWodState={namedWodState}
                    setOneRmState={setOneRmState}
                    setNamedWodState={setNamedWodState}
                    setMenuOneRmState={setMenuOneRmState}
                    setMenuNamedWodState={setMenuNamedWodState}
                />
                {tabToggleState == "open" 
                ? (
                    <>
                        <_ToggleButton onClick={()=>handleTabListToggle(tabToggleState)} >
                            <span>Close </span>
                            <_LeaderBoardFontAwesomeIcon icon={faSortUpSolid}/>
                        </_ToggleButton>
                    </>
                ) 
                : (
                    <>
                        <_LeaderBoardListMore>...</_LeaderBoardListMore>
                        <_ToggleButton onClick={()=>handleTabListToggle(tabToggleState)} >
                            <span>Open </span>
                            <_LeaderBoardFontAwesomeIcon icon={faSortDownSolid}/>
                        </_ToggleButton>
                    </>
                )
            }
                {menuOneRmState
                ?(
                    myOneRmRecord?.myOneRmRecords.lbOneRms !== undefined && myOneRmRecord?.myOneRmRecords.lbOneRms !== null
                    ? (

                        <_MyPageListBoxContentContainer>
                            {/* <_MyPageListBoxContent>Your <span>{oneRmState}</span> Record :  </_MyPageListBoxContent> */}
                            <_MyPageListBoxContent record={myOneRmRecord?.myOneRmRecords.lbOneRms.record}><span>{oneRmState}</span> {myOneRmRecord?.myOneRmRecords.lbOneRms.record}</_MyPageListBoxContent>
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
                                <_MyPageListBoxContent record={myNamedWodRecord?.myNamedWodRecords.lbNamedWods.record}>{myNamedWodRecord?.myNamedWodRecords.lbNamedWods.record}</_MyPageListBoxContent>
                                {/* <span>LB</span> */}
                            </_MyPageListBoxContentContainer>
                        )
                        :(
                            <_MyPageNoContent>Sorry, No Rep!</_MyPageNoContent>
                        )
                )}
            </_MyPageLeaderBoardContentContainer>
        </>
    )
}