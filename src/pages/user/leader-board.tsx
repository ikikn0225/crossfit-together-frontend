import { _LeaderBoardImg, _LeaderBoardImgContainer, _LeaderBoardImgTitle, _LeaderBoardContainer, _LeaderBoardTabContainer, _LeaderBoardTab, _LeaderBoardSubContainer, _LeaderBoardTabListContainer, _LeaderBoardTabList } from "@/theme/components/_LeaderBoard"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { LeaderBoardTabList } from "./leader-board-tab-list";

export const LeaderBoard = () => {
    const [menuOneRmState, setMenuOneRmState] = useState(1);
    const [menuNamedWodState, setMenuNamedWodState] = useState(0);

    const oneRmList = [
        {id:0, oneRm:'Clean'},
        {id:1, oneRm:'Power Clean'},
        {id:2, oneRm:'Clean and Jerk'},
        {id:3, oneRm:'Hang Clean'},
        {id:4, oneRm:'Hang Power Clean'},
        {id:5, oneRm:'Snatch'},
        {id:6, oneRm:'Power Snatch'},
        {id:7, oneRm:'Hang Snatch'},
        {id:8, oneRm:'Hang Power Snatch'},
        {id:9, oneRm:'Push Jerk'},
        {id:10, oneRm:'Split Jerk'},
        {id:11, oneRm:'Shoulder Press'},
        {id:12, oneRm:'Bench Press'},
        {id:13, oneRm:'Thruster'},
        {id:14, oneRm:'Back Squat'},
        {id:15, oneRm:'Front Squat'},
        {id:16, oneRm:'Overhead Squat'},
        {id:17, oneRm:'Deadlift'},
        {id:18, oneRm:'Thruster'}
    ];
    const namedWodList = [
        {id:0, namedWod:'Murph'},
        {id:1, namedWod:'Fran'},
        {id:2, namedWod:'Clean and Jerk'},
        {id:3, namedWod:'Cindy'},
        {id:4, namedWod:'Nick'},
        {id:5, namedWod:'Chelsea'},
        {id:6, namedWod:'Angie'},
        {id:7, namedWod:'Helen'},
        {id:8, namedWod:'The Seven | The CIA Seven'},
        {id:9, namedWod:'The Longest Mile'},
        {id:10, namedWod:'Nancy'},
        {id:11, namedWod:'Zeus'},
        {id:12, namedWod:'The Glen'},
        {id:13, namedWod:'The Chief'},
        {id:14, namedWod:'Filthy Fifty'}
    ];

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
            <Helmet>
                <title>LeaderBoard | CrossfiTogether</title>
            </Helmet>
            <_LeaderBoardImgContainer>
                <_LeaderBoardImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_LeaderBoardImg> 
                <_LeaderBoardImgTitle>Leader Board</_LeaderBoardImgTitle>
            </_LeaderBoardImgContainer>
            <_LeaderBoardContainer>
                <_LeaderBoardSubContainer>
                    <_LeaderBoardTabContainer>
                        <_LeaderBoardTab active={menuOneRmState} onClick={()=>handleMenu(1)}>1 RM</_LeaderBoardTab>
                        <_LeaderBoardTab active={menuNamedWodState} onClick={()=>handleMenu(0)}>Named Wod</_LeaderBoardTab>
                    </_LeaderBoardTabContainer>
                    <_LeaderBoardTabListContainer>
                        {menuOneRmState
                        ?(
                            oneRmList.map((oneRm)=> (
                                <LeaderBoardTabList
                                    key={oneRm.id}
                                    list={oneRm.oneRm}
                                />
                            ))
                        )
                        :(
                            namedWodList.map((namedWod)=> (
                                <LeaderBoardTabList
                                    key={namedWod.id}
                                    list={namedWod.namedWod}
                                />
                            ))
                        )}
                    </_LeaderBoardTabListContainer>
                </_LeaderBoardSubContainer>
            </_LeaderBoardContainer>
        </>
    )
}