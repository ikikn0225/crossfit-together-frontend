import { _LeaderBoardTab, _LeaderBoardTabContainer, _LeaderBoardTabList, _LeaderBoardTabListContainer } from "@/theme/components/_LeaderBoard";
import { namedWodList, oneRmList } from "./leader-board-tab-enum";


interface ILeaderBoardTabContainer {
    toggle:string;
    menuOneRmState:number;
    menuNamedWodState:number;
    oneRmState:string;
    namedWodState:string;
    setOneRmState:(oneRm:string)=>void;
    setNamedWodState:(namedWod:string)=>void;
    setMenuNamedWodState:(menuNamedWod:number)=>void;
    setMenuOneRmState:(menuNamedWod:number)=>void;
}

export const LeaderBoardTabContainer:React.FC<ILeaderBoardTabContainer> = ({
    toggle, menuOneRmState, menuNamedWodState, oneRmState, namedWodState, setOneRmState, setNamedWodState, setMenuNamedWodState, setMenuOneRmState
    }) => {

    const handleTabOneRmList = (oneRm:string) => {
        setOneRmState(oneRm);
    }

    const handleTabNamedWodList = (namedWod:string) => { 
        setNamedWodState(namedWod);
    }

    const handleMenu = (flag:number) => {
        if(flag) {
            setMenuOneRmState(1);
            setMenuNamedWodState(0);
        } else {
            setMenuOneRmState(0);
            setMenuNamedWodState(1);
        }
    }

    return(
        <>
            <_LeaderBoardTabContainer>
                <_LeaderBoardTab active={menuOneRmState} onClick={()=>handleMenu(1)}>1 RM</_LeaderBoardTab>
                <_LeaderBoardTab active={menuNamedWodState} onClick={()=>handleMenu(0)}>Named Wod</_LeaderBoardTab>
            </_LeaderBoardTabContainer>
            <_LeaderBoardTabListContainer toggle={toggle}>
                {menuOneRmState
                ?(
                    oneRmList.map((oneRm)=> (
                        <_LeaderBoardTabList
                            key={oneRm.id} 
                            oneRmList={oneRm.oneRm} 
                            oneRmState={oneRmState} 
                            onClick={()=>handleTabOneRmList(oneRm.oneRm) } 
                        > 
                            {oneRm.oneRm}
                        </_LeaderBoardTabList>
                    ))
                    )
                :(
                    namedWodList.map((namedWod)=> (
                        <_LeaderBoardTabList 
                            key={namedWod.id} 
                            namedWodList={namedWod.namedWod} 
                            namedWodState={namedWodState} 
                            onClick={()=>handleTabNamedWodList(namedWod.namedWod)} 
                        > 
                            {namedWod.namedWod} 
                        </_LeaderBoardTabList>
                    ))
                )}
            </_LeaderBoardTabListContainer>
        </>
    )
}