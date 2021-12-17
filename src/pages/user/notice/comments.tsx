import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { _NoticeCommentButton, _NoticeCommentForm, _NoticeCommentH4, _NoticeCommentsContainer, _NoticeCommentTextArea } from "@/theme/components/_Notice";
import { allCommentsInNotice } from "@/__generated__/allCommentsInNotice";
import { createCommentInNotice, createCommentInNoticeVariables } from "@/__generated__/createCommentInNotice";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { Comment } from "./comment";

export const CREATE_COMMENT = gql`
    mutation createCommentInNotice($input:CreateCommentInNoticeInput!) {
        createCommentInNotice(input:$input) {
            ok
            error
        }
    }
`;

export const NOTICE_COMMENTS = gql`
query allCommentsInNotice($input:AllCommentsInNoticeInput!) {
    allCommentsInNotice(input:$input) {
        comments {
            id
            content
            owner {
                name
                profileImg
            }
            createdAt
        }
    }
}
`;

interface ICommentsProps {
    noticeId:number;
}

interface ICommentProps {
    id:number;
    content:string;
    createdAt:Date;
    owner:IOwner;
}

interface IOwner {
    name:string;
    profileImg:string|null;
}

interface INoticeCommentForm {
    content: string;
}

export const Comments:React.FC<ICommentsProps> = ({noticeId}) => {
    const client = useApolloClient();
    const ref = useRef<HTMLTextAreaElement>(null);
    const { data:comments } = useQuery<allCommentsInNotice>(NOTICE_COMMENTS, {
        variables:{
            input:{
                noticeId
            }
        }
    });

    const onCompleted = (data:createCommentInNotice) => {
        const { createCommentInNotice: { ok }, } = data;
        if(ok) {
            const { content } = getValues();
            const existingNotices = client.readQuery({ query: NOTICE_COMMENTS, variables: { input: {noticeId}}});
            client.writeQuery({
                query: NOTICE_COMMENTS, variables: { input: {noticeId}},
                data: {
                    allCommentsInNotice: {
                        ...existingNotices.allCommentsInNotice,
                        comments: [
                            { 
                                id:noticeId,
                                content,
                                __typename: 'AllCommentsInNoticeOutput'
                            },
                            ...existingNotices.allCommentsInNotice.comments,
                        ],
                    },
                },
            });
        }
    }

    const [createCommentInNotice, { loading, data:createCommentInNoticeResult }] = useMutation<createCommentInNotice, createCommentInNoticeVariables>(CREATE_COMMENT, {
        onCompleted,   
    });

    const { register, control, getValues, watch, formState: { errors }, handleSubmit, formState } = useForm<INoticeCommentForm>({
        mode:"onChange",
    });


    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = '100px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, []);

    const onSubmit = async() => {
        try {
            const { content } = getValues();
            
            createCommentInNotice({
                variables: {
                    input: {
                        content,
                        noticeId
                    }
                }
            })
            if (ref === null || ref.current === null) {
                return;
            }
            ref.current.value = '';
            
        } catch (e:any) {
            console.log(e.response.data);
        }
    }

    return(
        <>
            <_NoticeCommentH4>{comments?.allCommentsInNotice.comments?.length}개의 댓글</_NoticeCommentH4>
            <_NoticeCommentForm onSubmit={handleSubmit(onSubmit)}>
                <_NoticeCommentTextArea 
                    {...register("content", {
                        required: "빈 댓글입니다",
                    })}
                    name="content"
                    placeholder="댓글을 작성해주세요"
                    className="textarea"
                    ref={ref}
                    onInput={handleResizeHeight}
                />
                {errors.content?.message && ( <FormError errorMessage={errors.content?.message} /> )}
                <_NoticeCommentButton>
                    <Button canClick={formState.isValid} loading={loading} actionText={"댓글 작성"} />
                </_NoticeCommentButton>
                {createCommentInNoticeResult?.createCommentInNotice.error && <FormError errorMessage={createCommentInNoticeResult.createCommentInNotice.error}/>}
            </_NoticeCommentForm>
            <_NoticeCommentsContainer>
                {comments?.allCommentsInNotice.comments?.length !== 0 
                &&(
                    comments?.allCommentsInNotice.comments?.map((comment:ICommentProps) => (
                        <Comment
                            key={comment.id}
                            id={comment.id}
                            content={comment.content}
                            createdAt={comment.createdAt}
                            owner={comment.owner}
                            noticeId={noticeId}
                        />
                    ))
                )}
            </_NoticeCommentsContainer>
        </>
    )
}