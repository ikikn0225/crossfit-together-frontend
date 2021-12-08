import { _LeaderBoardImg, _LeaderBoardImgContainer, _LeaderBoardImgTitle, _LeaderBoardContainer, _LeaderBoardTabContainer, _LeaderBoardTab, _LeaderBoardSubContainer, _LeaderBoardTabListContainer, _LeaderBoardTabList, _LeaderBoardRecordListContainer, _LeaderBoardCreateBoardContainer, _LeaderBoardCreateWodButton, _LeaderBoardListBox, _LeaderBoardListBoxNewContentContainer, _LeaderBoardListInputForm, _LeaderBoardListInput, _LeaderBoardInputButton, _LeaderBoardFontAwesomeIcon, _LeaderBoardNoContent, _ToggleButton, _LeaderBoardListMore } from "@/theme/components/_LeaderBoard"
import { allNamedWodRecords } from "@/__generated__/allNamedWodRecords";
import { allOneRmRecords } from "@/__generated__/allOneRmRecords";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { LeaderBoardListBoxNamedWod } from "./leader-board-namedwod-list-box";
import { LeaderBoardListBoxOneRm } from "./leader-board-onerm-list-box";
import { namedWodList, oneRmList } from "./leader-board-tab-enum";
import gql from "graphql-tag";
import { LeaderBoardTabContainer } from "./leader-board-tab-container";
import { classNames } from "react-select/src/utils";
import { 
    faSortDown as faSortDownSolid, 
    faSortUp as faSortUpSolid, 
} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faWindowClose } from "@fortawesome/free-regular-svg-icons";

export const ALL_ONE_RM_RECORDS = gql`
    query allOneRmRecords($input:AllOneRmRecordsInput!) {
        allOneRmRecords(input:$input) {
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

export const ALL_NAMED_WOD_RECORDS = gql`
    query allNamedWodRecords($input:AllNamedWodRecordsInput!) {
        allNamedWodRecords(input:$input) {
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

interface ILeaderBoardTab {
    me:IMe;
}

interface IMe {
    id:number;
    email:string;
    affiliatedBoxId:number|null;
    name:string;
    profileImg:string|null;
    role:string;
    verified:boolean;
}

export const LeaderBoardTab:React.FC<ILeaderBoardTab> = (me) => {
    const [menuOneRmState, setMenuOneRmState] = useState(1);
    const [menuNamedWodState, setMenuNamedWodState] = useState(0);
    const [oneRmState, setOneRmState] = useState("Clean");
    const [namedWodState, setNamedWodState] = useState("Murph");
    const [tabToggleState, setTabToggleState] = useState("close");

    const { data:oneRmRecord, loading:lbOneRmLoading } = useQuery<allOneRmRecords>(ALL_ONE_RM_RECORDS, {
        variables: {
            input: {
                oneRm:oneRmState.split(' ').join('_'),
            }
        }
    });

    const { data:namedWodRecord, loading:lbNamedWodLoading } = useQuery<allNamedWodRecords>(ALL_NAMED_WOD_RECORDS, {
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
                            <span>리스트 닫기 </span>
                            <_LeaderBoardFontAwesomeIcon icon={faSortUpSolid}/>
                        </_ToggleButton>
                    </>
                ) 
                : (
                    <>
                        <_LeaderBoardListMore>...</_LeaderBoardListMore>
                        <_ToggleButton onClick={()=>handleTabListToggle(tabToggleState)} >
                            <span>리스트 보기 </span>
                            <_LeaderBoardFontAwesomeIcon icon={faSortDownSolid}/>
                        </_ToggleButton>
                    </>
                )
            }
            <_LeaderBoardRecordListContainer>
                {menuOneRmState
                ?(
                    <LeaderBoardListBoxOneRm
                        oneRmRecord={oneRmRecord}
                        lbOneRmLoading={lbOneRmLoading}
                        oneRmState={oneRmState}
                        userId={me?.me.id}
                    />
                )
                :(
                    <LeaderBoardListBoxNamedWod
                        namedWodRecord={namedWodRecord}
                        lbNamedWodLoading={lbNamedWodLoading}
                        namedWodState={namedWodState}
                        userId={me?.me.id}
                    />
                )}
            </_LeaderBoardRecordListContainer>
        </>
    )
}