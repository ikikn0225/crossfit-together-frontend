import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { _ButtonCommon } from './_Button';
import { _Container, _SubContainer } from './_Layout';
import { _NoBoxSpan } from './_NoBox';
import { _WodCreateWodButton, _WodCreateWodButtonContainer, _WodImg, _WodImgContainer, _WodImgTitle, _WodListContainer, _WodListLayout, _WodListSubContainer, _WodNoContent, _WodUpdateWodLinkContainer } from './_Wod';

export const _TimeTableImgContainer = styled(_WodImgContainer)``;

export const _TimeTableImg = styled(_WodImg)``;

export const _TimeTableImgTitle = styled(_WodImgTitle)``;

export const _TimeTableProfileContainer = styled.div`
    text-align:center;
`;

export const _TimeTableForm = styled.form``;

export const _TimeTableFileInput = styled.input`
    display:none;
`;

export const _TimeTableNoContent = styled(_WodNoContent)``;

export const _TimeTableContentImgContainer = styled.div`
    height:500px;
    width:100%;
    background-color:gray;
    text-align:center;
    margin-top:1rem;
`;

interface ITimeTableImgProps {
    backgroundImage:string;
}

export const _TimeTableContentImg = styled.img<ITimeTableImgProps>`
    height:100%;
    width:100%;
    background-repeat:no-repeat;
    background-size: contain;
    background-image: url(${(props)=>props.backgroundImage}); 
`;

export const _TimeTableFileLabel = styled.label `
    font-size: 1.125rem;
    height: 2.25rem;
    border-radius: 3px;
    font-weight: bold;
    outline: none;
    border: none;
`;