import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { _ButtonCommon } from './_Button';
import { _Container, _SubContainer } from './_Layout';
import { _NoBoxSpan } from './_NoBox';
import { _WodCreateWodButton, _WodCreateWodButtonContainer, _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer, _WodListLayout, _WodListSubContainer, _WodNoContent, _WodUpdateWodLinkContainer } from './_Wod';

export const _BoardImgContainer = styled(_WodImgContainer)``;

export const _BoardImg = styled(_WodImg)``;

export const _BoardImgTitle = styled(_WodImgTitle)``;

export const _BoardCreateWodButton = styled(_WodCreateWodButton)``;

export const _BoardCreateWodButtonContainer = styled(_WodCreateWodButtonContainer)``;

export const _BoardListContainer = styled(_WodListContainer)``;

export const _BoardListSubContainer = styled.div`
    width:auto;
    text-align:center;
    overflow: hidden;
    // & > div:nth-child(1) {
    //     margin-top:6rem;
    // }

    & > div {
        padding-top:2rem;
        border-bottom:1px solid #3d3d3d;
    }
`;

export const _BoardListLayout = styled.div`
    border-bottom:0px;
    margin-top:2rem;
    margin-bottom:2rem;
    text-align:left;
`;

export const _BoardListBox = styled.div`
    max-height: 200px;
    margin-left:3rem;
    margin-right:3rem;
    border:1px solid #3d3d3d;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 5px;
        border-radious: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #2f3542;
    }
`;

export const _BoardListBoxContentContainer = styled.div`
    padding-top:1rem;
    padding-bottom:1rem;
    border-bottom:1px solid #3d3d3d;
    & > div:last-child {
        border-bottom:0px;
    }
`;

export const _BoardListBoxContent = styled.div`
    // padding-bottom:1rem;
`;

export const _BoardListBoxContentInput = styled.input`
    display:none;
    padding:0.5em;
`;


export const _BoardNoContent = styled(_WodNoContent)`
    padding-top:3rem;
    padding-bottom:3rem;
`;

export const _BoardListBoxNewContentContainer = styled.div`
    display:none;
    padding-top:1rem;
    padding-bottom:1rem;
    border-bottom:1px solid #3d3d3d;
`;

interface IFont {
    userId?:number;
    borOwnerId?:number;
    editCheck?:boolean;
}
export const _BoardFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size:1.3rem;
    border:0px;
`;

export const _BoardInputButton = styled.button<IFont>`
    padding:0;
    border:0;
    float:right;
    margin-right:5px;
    width:1.5rem;
    background-color:#000;
    color:#fff;

    ${(props)=>props.userId == props.borOwnerId
        ? "display:block;"
        : "display:none;"
    }

    ${(props)=>props.editCheck
        && "display:none;"
    }
`;

export const _BoardListInput = styled.input`
    padding:0.5em;
`;

export const _BoardListInputForm = styled.form``;

export const _BoardCreateBoardContainer = styled(_WodUpdateWodLinkContainer)``;