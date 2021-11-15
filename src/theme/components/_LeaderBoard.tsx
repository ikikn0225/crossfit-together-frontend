import styled from "styled-components";
import { _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer } from "./_Wod";
import { _BoardListSubContainer } from "./_BoardOfRecords";


export const _LeaderBoardImgContainer = styled(_WodImgContainer)``;

export const _LeaderBoardImg = styled(_WodImg)``;

export const _LeaderBoardImgTitle = styled(_WodImgTitle)``;

export const _LeaderBoardContainer = styled(_WodListContainer)``;

export const _LeaderBoardSubContainer = styled.div`
    width:auto;
    text-align:center;
    overflow: hidden;
    margin-top:3rem;
    padding-left:2rem;
    padding-right:2rem;
`;

export const _LeaderBoardTabContainer = styled.ul`
    
`;

interface ITab {
    active:number;
}
export const _LeaderBoardTab = styled.li<ITab>`
    display: inline-block;
    border: 1px solid #3d3d3d;
    padding: 1rem;
    width:50%;
    background-color:gray;
    border: 1px solid gray;


    ${(props)=>props.active == 1
        && "background-color: rgb(7,93,198); border: 1px solid rgb(7,93,198);"
    }

`;

export const _LeaderBoardTabListContainer = styled.ul`

`;

export const _LeaderBoardTabList = styled.li`
    display: inline-block;
    border: 1px solid #3d3d3d;
    padding: 1rem;
    width: 33.333%;
    height:4rem;
    vertical-align: middle;
`;