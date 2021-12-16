import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import ModalBase from "@/pages/modal-base";
import { _EditNoticeFileInput, _EditNoticeFileLabel, _EditNoticeForm, _EditNoticeInput, _EditNoticeSpan, _EditNoticeSubContainer, _EditNoticeTextArea, _NoticeImg, _NoticeImgContainer, _NoticeImgTitle } from "@/theme/components/_Notice";
import { editNotice, editNoticeVariables } from "@/__generated__/editNotice";
import { notice, noticeVariables } from "@/__generated__/notice";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { NOTICE } from "./notice-detail";
import { faTimes as faTimesSolid} from "@fortawesome/free-solid-svg-icons";
import { _BoardFontAwesomeIcon, _BoardInputButton } from "@/theme/components/_BoardOfRecords";

export const EDIT_NOTICE = gql`
mutation editNotice($input:EditNoticeInput!) {
    editNotice(input:$input) {
        ok
        error
    }
}
`;

interface IParams {
    id: string;
}

interface IEditNoticeForm {
    title: string;
    contents: string;
    coverImg?:string|null;
}

export const EditNotice = () => {
    const {id} = useParams<IParams>();
    const [file, setFile] = useState("");
    const [stateEmptyImg, setStateEmptyImg] = useState(true);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLTextAreaElement>(null);
    const [stateTitle, setStateTitle] = useState("");
    const [stateContent, setStateContent] = useState("");

    const { data:notice } = useQuery<notice, noticeVariables>(
        NOTICE,
        {
            variables: {
                input: {
                    noticeId:+id,
                },
            },
        }
    );
    
    const onCompleted = (data:editNotice) => {
        const { editNotice:{ok} } = data;
        if(ok) {
            handleModalOpen();
        }
    }

    const [ editNotice, { loading, data:editNoticeResult } ] = useMutation<editNotice, editNoticeVariables>(EDIT_NOTICE, {
        onCompleted,
    });

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<IEditNoticeForm>({
        mode:"onChange",
    });

    const onSubmit = async() => {
        try {
            const { title, contents } = getValues();

            if(!file) {
                editNotice({
                    variables: {
                        input: {
                            title,
                            contents,
                            noticeId:+id
                        }
                    }
                })
                return;
            }

            const actualFile = file;
            const formBody = new FormData();
            formBody.append("file", actualFile);
            let uri:string;
            process.env.NODE_ENV === "production"
            ? uri='https://crossfitogether0225.herokuapp.com/uploads'
            : uri='http://localhost:4000/uploads'
            const { url: coverImg } = await (
                await fetch(uri, {
                    method:"POST",
                    body:formBody,
                })
            ).json();

            editNotice({
                variables:{
                    input:{
                        title,
                        coverImg,
                        contents,
                        noticeId:+id
                    }
                }
            })
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
        history.push("/notices");
        location.reload();
    };

    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = '100px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, []);

    const changeInput = (e:any) => {
        setFile(e.target.files[0]);
        setStateEmptyImg(false);
    }

    const emptyFile = () => {
        setFile("");
        setStateEmptyImg(true);
    }

    useEffect(() => {
        if(loading === false && notice) {
            setStateTitle(notice?.notice.notice?.title+"");
            setStateContent(notice?.notice.notice?.contents+"");
            if(notice?.notice.notice?.coverImg) setStateEmptyImg(false);
            
            setTimeout(()=>{ 
                if (ref === null || ref.current === null) {
                    return;
                }
                ref.current.focus();
            }, 1000);
        }
    }, [loading, notice]);

    return (
        <>
            <Helmet>
                <title>Edit Notice | CrossfiTogether</title>
            </Helmet>
            <_NoticeImgContainer>
                <_NoticeImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_NoticeImg> 
                <_NoticeImgTitle>Edit Notice</_NoticeImgTitle>
            </_NoticeImgContainer>
            <_EditNoticeSubContainer>
                <_EditNoticeForm  onSubmit={handleSubmit(onSubmit)}>
                    <_EditNoticeSpan>* Notice Title</_EditNoticeSpan>
                    <_EditNoticeInput
                        autoFocus
                        {...register("title", {
                            required: "제목을 적어주세요.",
                        })}
                        name="title"
                        type="text"
                        placeholder="제목"
                        className="input"
                        value={stateTitle}
                    />
                    {errors.title?.message && (
                        <FormError errorMessage={errors.title?.message} />
                    )}
                    <_EditNoticeSpan>Notice Image</_EditNoticeSpan>
                    <_EditNoticeFileInput
                            {...register("coverImg")}
                            type="file"
                            accept="image/*"
                            onChange={changeInput}
                            id="input-file"
                            style={{ display: 'none' }}
                    />
                    <_EditNoticeFileLabel htmlFor="input-file"> 이미지 추가하기 </_EditNoticeFileLabel>
                    <_BoardInputButton type="button" onClick={()=>emptyFile()}>
                        <_BoardFontAwesomeIcon icon={faTimesSolid}/>
                    </_BoardInputButton>
                    {/* 
                        img 삭제 버튼 클릭 시 empty true
                        img 있거나 기본 empty false
                    */}
                    {!stateEmptyImg && (
                        notice?.notice.notice?.coverImg && !file
                        ?(
                            <img src={notice?.notice.notice?.coverImg} id="preview"/>
                        )
                        :(
                            <img src={file? URL.createObjectURL(file) : undefined} id="preview"/>
                        )
                    )}
                    
                    {errors.coverImg?.message && ( <FormError errorMessage={errors.coverImg?.message} />
                    )}
                    <_EditNoticeSpan>* Notice Content</_EditNoticeSpan>
                    <_EditNoticeTextArea 
                        {...register("contents", {
                            required: "내용을 적어주세요.",
                        })}
                        name="contents"
                        placeholder="내용"
                        className="textarea"
                        ref={ref}
                        onInput={handleResizeHeight}
                        defaultValue={stateContent}
                    ></_EditNoticeTextArea>
                    {errors.contents?.message && ( <FormError errorMessage={errors.contents?.message} />
                    )}
                    <Button canClick={true} loading={loading} actionText={"작성 완료"} />
                    {editNoticeResult?.editNotice.error && <FormError errorMessage={editNoticeResult.editNotice.error}/>}
                </_EditNoticeForm>
                <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"게시물 작성 완료했습니다."} modalButtonText={"확인"}> </ModalBase>
            </_EditNoticeSubContainer>
        </>
    )
}