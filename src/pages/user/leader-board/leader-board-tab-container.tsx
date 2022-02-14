import CommonModal from "@/components/modal";
import { _LeaderBoardTab, _LeaderBoardTabContainer, _LeaderBoardTabList, _LeaderBoardTabListContainer } from "@/theme/components/_LeaderBoard";
import { _MyPageFontAwesomeIcon, _MyPageModalButton } from "@/theme/components/_MyPage";
import { useState } from "react";
import { namedWodList, oneRmList } from "./leader-board-tab-enum";
import { faInfo as faInfoSolid, faQuestion as faQuestionSolid } from "@fortawesome/free-solid-svg-icons";

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

    const [isOpen, setIsOpen] = useState(false);
    const [namedContent, setNamedContent] = useState("");
    
    const handleTabOneRmList = (oneRm:string) => {
        setOneRmState(oneRm);
        window.scrollTo({ top: document.body.scrollHeight, behavior:'smooth' });
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

    const handleModalOpen = (content:string) => {
        const body = document.querySelector("body");
        if(body) body.style.overflow = "hidden";
        setNamedContent(content)
        setIsOpen(true);
    };

    const handleModalClose = () => {
        const body = document.querySelector("body");
        if(body) body.style.overflow = "auto";
        setIsOpen(false);
    };

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
                            <div>
                                <_MyPageFontAwesomeIcon onClick={()=>handleModalOpen(namedWod.namedWodContents)} icon={faQuestionSolid}/>
                            </div>
                            {namedWod.namedWod}
                        </_LeaderBoardTabList>
                    ))
                )}
                <CommonModal isOpen={isOpen} content={namedContent} handleModalClose={handleModalClose}></CommonModal>
            </_LeaderBoardTabListContainer>
        </>
    )
}