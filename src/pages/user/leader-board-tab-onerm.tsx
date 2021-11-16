import { _LeaderBoardTabList } from "@/theme/components/_LeaderBoard";
import { allNamedWodRecords } from "@/__generated__/allNamedWodRecords";
import { allOneRmRecords } from "@/__generated__/allOneRmRecords";
import { ALL_ONE_RM_RECORDS } from "./leader-board";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

interface ITabList {
    list:string;
}

const handleTabList = (oneRm:allOneRmRecords|undefined) => {
    console.log(oneRm);
    
}

export const LeaderBoardTabOneRm:React.FC<ITabList> = ({list}) => {
    const { data:oneRm } = useQuery<allOneRmRecords>(ALL_ONE_RM_RECORDS, {
        variables: {
            input: {
                oneRm:list.split(' ').join('_'),
            }
        }
    });
    
    return (
        <>
            <_LeaderBoardTabList onClick={()=>handleTabList(oneRm)}> {list} </_LeaderBoardTabList>
        </>
    );
}