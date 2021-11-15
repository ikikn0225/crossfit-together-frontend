import { _LeaderBoardTabList } from "@/theme/components/_LeaderBoard";
import { allNamedWodRecords } from "@/__generated__/allNamedWodRecords";
import { allOneRmRecords } from "@/__generated__/allOneRmRecords";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const ALL_ONE_RM_RECORDS = gql`
    query allOneRmRecords($input:AllOneRmRecordsInput!) {
        allOneRmRecords(input:$input) {
            ok
            error
            lbOneRms {
                record
                owner {
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
                record
                owner {
                    name
                }
            }
        }
    }
`;

interface ITabList {
    list:string;
}

const handleTabList = (list:string) => {
    console.log(1);
    
}

export const LeaderBoardTabList:React.FC<ITabList> = ({list}) => {
    const { data:oneRms } = useQuery<allOneRmRecords>(ALL_ONE_RM_RECORDS, {
        variables: {
            input: {
                oneRm:list,
            }
        }
    });
    const { data:namedWod } = useQuery<allNamedWodRecords>(ALL_NAMED_WOD_RECORDS, {
        variables: {
            input: {
                namedWod:list,
            }
        }
    });
    console.log(oneRms);
    console.log(namedWod);
    
    return (
        <>
            <_LeaderBoardTabList onClick={()=>handleTabList(list)}> {list} </_LeaderBoardTabList>
        </>
    );
}