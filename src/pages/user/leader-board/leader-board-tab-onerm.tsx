import { _LeaderBoardTabList } from "@/theme/components/_LeaderBoard";
import { allNamedWodRecords } from "@/__generated__/allNamedWodRecords";
import { allOneRmRecords } from "@/__generated__/allOneRmRecords";
import { ALL_ONE_RM_RECORDS } from "./leader-board-tab";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

interface ITabList {
    list:string;
}

export const LeaderBoardTabOneRm:React.FC<ITabList> = ({list}) => {
    
    return (
        <>
            <_LeaderBoardTabList> {list} </_LeaderBoardTabList>
        </>
    );
}