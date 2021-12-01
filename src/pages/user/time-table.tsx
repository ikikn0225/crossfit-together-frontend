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
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [imgHeight, setImgHeight] = useState<number|undefined>(0);
    
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
            console.log("성공");
            
        }
    }
    const [addTimeTable, { loading, data:addTimeTableResult }] = useMutation<addTimeTable, addTimeTableVariables>(ADD_TIME_TABLE, {
        onCompleted,   
    });

    const onSubmit = async() => {
        try {
            const { timeTableImg } = getValues();
            
            const actualFile = timeTableImg[0];
            const formBody = new FormData();
            formBody.append("file", actualFile);
            const { url: timeTableImgUrl } = await (
                await fetch("http://localhost:4000/uploads/", {
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
        } catch (e:any) {
            console.log(e);
        }
    }

    const changeInput = (e:any) => {
        setFile(e.target.files[0]);
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
                                    required: "Image is required",
                                })}
                                type="file"
                                accept="image/*"
                                onChange={changeInput}
                                id="input-file"
                            />
                            {/* <_TimeTableFileLabel className="input-file-button" htmlFor="input-file"> Click to Select a Image... </_TimeTableFileLabel> */}
                            <Button canClick={true} loading={loading} actionText={"Confirm"} />
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