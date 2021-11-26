import { _LeaderBoardTabList } from "@/theme/components/_LeaderBoard";
import { allNamedWodRecords } from "@/__generated__/allNamedWodRecords";
import { allOneRmRecords } from "@/__generated__/allOneRmRecords";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { ALL_NAMED_WOD_RECORDS } from "./leader-board-tab";

interface ITabList {
    list:string;
}

const handleTabList = (list:string) => {
    console.log(list);
    
}

export const LeaderBoardTabNamedWod:React.FC<ITabList> = ({list}) => {
    const { data:namedWod } = useQuery<allNamedWodRecords>(ALL_NAMED_WOD_RECORDS, {
        variables: {
            input: {
                namedWod:list.split(' ').join('_'),
            }
        }
    });
    
    return (
        <>
            <_LeaderBoardTabList onClick={()=>handleTabList(list)}> {list} </_LeaderBoardTabList>
        </>
    );
}