import Spinner from "@/components/spinner";
import { Wod } from "@/components/wod";
import { useMe } from "@/hooks/useMe";
import { _BoardCreateBoardContainer, _BoardCreateWodButton, _BoardCreateWodButtonContainer, _BoardImg, _BoardImgContainer, _BoardImgTitle, _BoardListContainer, _BoardListSubContainer } from "@/theme/components/_BoardOfRecords"
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { _WodNoContent } from "@/theme/components/_Wod";
import { allBoardofRecords } from "@/__generated__/allBoardofRecords";
import { wodList } from "@/__generated__/wodList";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useRef } from "react";
import { Helmet } from "react-helmet-async"
import { IWodEdge, WOD_LIST } from "./wods";

export const ALL_BOARD_OF_RECORDS = gql`
    query allBoardofRecords($input:AllBoardofRecordInput!) {
        allBoardofRecords(input:$input) {
            ok
            error
            bors {
                id
                content
            }
        }
    }
`;


export const BoardOfRecord = () => {
    const { data, loading, error } = useMe();
    const loader = useRef<HTMLDivElement>(null);
    const delay = true;
    const { loading:wodLoading, error:wodListError, data:wodList, fetchMore, refetch, networkStatus } = useQuery<wodList>(WOD_LIST, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });
    const { loading:boardofRecordLoading, data:boardofRecordList } = useQuery<allBoardofRecords>(ALL_BOARD_OF_RECORDS);

    const CreateRecordInput = () => {
        console.log("hello~");
    }

    if (!data || loading || error) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }

    return(
        <>
            <Helmet>
                <title>BoardOfRecord | CrossfiTogether</title>
            </Helmet>
            <_BoardImgContainer>
                <_BoardImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_BoardImg> 
                <_BoardImgTitle>Board Of Record</_BoardImgTitle>
            </_BoardImgContainer>
            <_BoardListContainer>
                <_BoardListSubContainer>
                    {wodList?.wodList.edges?.length !== 0
                    ? (
                        wodList?.wodList.edges?.map((wod:IWodEdge) => (
                            <div>
                                <_BoardCreateBoardContainer>
                                    <_BoardCreateWodButton onClick={CreateRecordInput}>Create Record</_BoardCreateWodButton>
                                </_BoardCreateBoardContainer>
                                <Wod 
                                    key={wod.node.title}
                                    role={data.me.role}
                                    userId={data.me.id}
                                    id={wod.node.id}
                                    title={wod.node.title}
                                    titleDate={wod.node.titleDate}
                                    content={wod.node.content}
                                />
                            </div>
                        ))
                    )
                    : (
                        <_WodNoContent>Sorry, No Rep!</_WodNoContent>
                    )}
                    {wodLoading && 
                        <Spinner />
                    }
                    <div ref={loader} />
                </_BoardListSubContainer>
            </_BoardListContainer>
        </>
    )
}