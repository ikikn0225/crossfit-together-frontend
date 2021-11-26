import styled from "styled-components";
import { _WodCreateWodButton, _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer, _WodNoContent, _WodUpdateWodLinkContainer } from "./_Wod";
import { _BoardListLayout, _BoardListSubContainer } from "./_BoardOfRecords";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
    border:1px solid rgb(7,93,198);
`;

interface ITabList {
    oneRmList?:string;
    namedWodList?:string;
    oneRmState?:string;
    namedWodState?:string;
}

export const _LeaderBoardTabList = styled.li<ITabList>`
    display: inline-block;
    border: 1px solid #3d3d3d;
    padding: 1rem;
    width: 33.333%;
    height:4rem;
    vertical-align: middle;
    line-height:normal;
    cursor:pointer;

    &:hover {
        background-color: rgb(7,93,198);
        border: 1px solid rgb(7,93,198);
    }

    ${(props)=>props.oneRmState && props.oneRmState == props.oneRmList
        && "background-color: rgb(7,93,198); border: 1px solid rgb(7,93,198);"
    }

    ${(props)=>props.namedWodState && props.namedWodState == props.namedWodList
        && "background-color: rgb(7,93,198); border: 1px solid rgb(7,93,198);"
    }
`;

export const _LeaderBoardRecordListContainer = styled(_BoardListLayout)``;

export const _LeaderBoardCreateBoardContainer = styled(_WodUpdateWodLinkContainer)``;

export const _LeaderBoardCreateWodButton = styled(_WodCreateWodButton)``;

export const _LeaderBoardListBox = styled.div`
    max-height: 500px;
    border:1px solid #3d3d3d;
    overflow-y: auto;
    text-align: center;
    ::-webkit-scrollbar {
        width: 5px;
        border-radious: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #2f3542;
    }

    // 순위 왕관 색상
    & > div:nth-of-type(2) > form > div:nth-of-type(1) > svg:nth-of-type(1){
        color:#FFD700;
        margin-bottom: 1rem;
        display:inline;
    }
    & > div:nth-of-type(3) > form > div:nth-of-type(1) > svg:nth-of-type(1){
        color:#C0C0C0;
        margin-bottom: 1rem;
        display:inline;
    }
    & > div:nth-of-type(4) > form > div:nth-of-type(1) > svg:nth-of-type(1){
        color:#C49C48;
        margin-bottom: 1rem;
        display:inline;
    }
`;


export const _LeaderBoardListBoxContentContainer = styled.div`
    padding-top:1rem;
    padding-bottom:1rem;
    border-bottom:1px solid #3d3d3d;
    & > div:last-child {
        border-bottom:0px;
    }
`;

interface IContent {
    record?:number;
}
export const _LeaderBoardListBoxContent = styled.div<IContent>`
    padding-bottom:1rem;

    ${(props)=>props.record
        && "font-size:xx-large; font-weight:bold;display:inline-block;"
    }
`;

export const _LeaderBoardListBoxContentInput = styled.input`
    display:none;
    padding:0.5em;
`;


export const _LeaderBoardNoContent = styled(_WodNoContent)`
    padding-top:3rem;
    padding-bottom:3rem;
`;

export const _LeaderBoardListBoxNewContentContainer = styled.div`
    display:none;
    padding-top:1rem;
    padding-bottom:1rem;
    border-bottom:1px solid #3d3d3d;
`;

export const _LeaderBoardFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size:1.3rem;
    border:0px;
`;

interface ICrown {
    crown?:boolean;
}
export const _LeaderBoardFontAwesomeIconContainer = styled.div<ICrown>`
    ${(props)=>props.crown
        && "& > svg {display:none;}"
    }
`;

interface IFont {
    userId?:number;
    ownerid?:number;
    editCheck?:boolean;
}
export const _LeaderBoardInputButton = styled.button<IFont>`
    padding:0;
    border:0;
    float:right;
    margin-right:5px;
    width:1.5rem;
    background-color:#000;
    color:#fff;

    ${(props)=>props.userId == props.ownerid
        ? "display:block;"
        : "display:none;"
    }

    ${(props)=>props.editCheck
        && "display:none;"
    }
`;

export const _LeaderBoardListInput = styled.input`
    padding:0.5em;
`;

export const _LeaderBoardListInputForm = styled.form``;