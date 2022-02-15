import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { useMe } from "@/hooks/useMe";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { _TimeTableFileInput, _TimeTableForm, _TimeTableContentImgContainer, _TimeTableContentImg, _TimeTableImg, _TimeTableImgContainer, _TimeTableImgTitle, _TimeTableNoContent, _TimeTableFileLabel} from "@/theme/components/_TimeTable"
import { addTimeTable, addTimeTableVariables } from "@/__generated__/addTimeTable";
import { UserRole } from "@/__generated__/globalTypes";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import ModalBase from "../modal-base";
import { useMyBox } from "@/hooks/useMyBox";
import { _Container, _SubContainer } from "@/theme/components/_Layout";
import imageCompression from 'browser-image-compression';

export const ADD_TIME_TABLE = gql`
    mutation addTimeTable($input:AddTimeTableInput!) {
        addTimeTable(input:$input) {
            ok
            error
        }
    }
`;

interface ITimeTableForm {
    timeTableImg: string;
}

export const TimeTable = () => {
    const { data:me, loading:meLoading, error:meError } = useMe();
    const {data:myAffiliatedBox} = useMyBox();
    const [file, setFile] = useState<File|null>(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
        location.reload();
    };

    const {register, getValues, watch, formState: { errors }, handleSubmit, formState} = useForm<ITimeTableForm>({
        mode:"onChange",
    });

    const onCompleted = (data: addTimeTable) => {
        const { addTimeTable: { ok, error } } = data;
        if(ok) {
            // setUploading(false); 
            handleModalOpen();
            
        }
    }
    const [addTimeTable, { loading, data:addTimeTableResult }] = useMutation<addTimeTable, addTimeTableVariables>(ADD_TIME_TABLE, {
        onCompleted,   
    });

    const onSubmit = async() => {
        try {
            const { timeTableImg } = getValues();
            
            if(file) {
                const actualFile = file;
                const formBody = new FormData();
                formBody.append("file", actualFile);
                let uri:string;
                process.env.NODE_ENV === "production"
                ? uri='https://crossfitogether0225.herokuapp.com/uploads'
                : uri='http://localhost:4000/uploads'
                const { url: timeTableImgUrl } = await (
                    await fetch(uri, {
                        method:"POST",
                        body:formBody,
                    })
                ).json();
                
                addTimeTable({
                    variables: {
                        input: {
                            timeTableImg:timeTableImgUrl
                        }
                    }
                })
                
            }
        } catch (e:any) {
            console.log(e);
        }
    }

    const changeInput = async (e:any) => {
        let imgFile = e.target.files[0];	// 입력받은 file객체
        const options = {
            maxSizeMB: 2, 
            maxWidthOrHeight: 500
        }
        try {
            const compressedFile = await imageCompression(imgFile, options);
            setFile(compressedFile);
        } catch(error) {
            console.log(error);
        }
    }

    if (!me || meLoading || meError) {
        return (
            <_Loading>
                <_LoadingSpan>Loading...</_LoadingSpan>
            </_Loading>
        );
    }

    return(
        <>
            <Helmet>
                <title>Time Table | CrossfiTogether</title>
            </Helmet>
            <_TimeTableImgContainer>
                <_TimeTableImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_TimeTableImg> 
                <_TimeTableImgTitle>Time Table</_TimeTableImgTitle>
            </_TimeTableImgContainer>
            <_Container>
                <_SubContainer>
                    {me.me.role == UserRole.Coach
                    &&(
                        <_TimeTableForm onSubmit={handleSubmit(onSubmit)}>
                            <_TimeTableFileInput 
                                {...register("timeTableImg", {
                                    required: "시간표 이미지를 추가해주세요",
                                })}
                                type="file"
                                accept="image/*"
                                onChange={changeInput}
                                id="input-file"
                                style={{ display: 'none' }}
                            />
                            <_TimeTableFileLabel htmlFor="input-file"> 시간표 이미지를 선택해주세요 </_TimeTableFileLabel>
                            <Button canClick={true} loading={loading} actionText={"확인"} />
                            <img src={file? URL.createObjectURL(file) : undefined} id="preview"/>
                        </_TimeTableForm>
                    )}
                    {myAffiliatedBox?.myAffiliatedBox.affiliatedBox.timeTableImg !== null && myAffiliatedBox?.myAffiliatedBox.affiliatedBox.timeTableImg !== undefined
                    ?(
                        <_TimeTableContentImgContainer>
                            <_TimeTableContentImg backgroundImage={myAffiliatedBox?.myAffiliatedBox.affiliatedBox.timeTableImg}></_TimeTableContentImg> 
                        </_TimeTableContentImgContainer>
                    )
                    :(
                        <_TimeTableNoContent>Sorry, No Rep!</_TimeTableNoContent>
                    )}
                </_SubContainer>
            </_Container>
            <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"Compelete!"} modalButtonText={"Good"}> </ModalBase>
        </>
    )
}