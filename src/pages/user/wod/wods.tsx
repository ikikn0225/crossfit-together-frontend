import { Wod } from "@/pages/user/wod/wod";
import { useMe } from "@/hooks/useMe";
import { _Loading, _LoadingSpan } from "@/theme/components/_Loading";
import { 
    _WodListContainer, 
    _WodListSubContainer, 
    _WodListTitle, 
    _WodCreateWodButton, 
    _WodCreateWodButtonContainer, 
    _WodImg, 
    _WodImgContainer, 
    _WodImgTitle, 
    _WodNoContent, 
    _WodListContent, 
    _WodListLayout,
    _WodUpdateWodLink,
    _WodUpdateWodLinkContainer,
    _WodDeleteWodButton,
    _WodListDay,
    _WodCategoryContainer,
    _WodCategoryLink,
    _WodFontAwesomeIcon,
    _WodGoToTopButton
} from "@/theme/components/_Wod"
import { deleteWod, deleteWodVariables } from "@/__generated__/deleteWod";
import { UserRole } from "@/__generated__/globalTypes";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"
import { useHistory } from "react-router-dom";
import ModalBase from "../../modal-base";
import { useParams } from "react-router"
import { CategoryList } from "./category-list";
import { wodList } from "@/__generated__/wodList";
import Spinner from "@/components/spinner";
import 'regenerator-runtime';
import { faArrowUp as faArrowUpSolid } from "@fortawesome/free-solid-svg-icons";

export const WOD_LIST = gql`
    query wodList($first: Int, $after: Int, $slug: String) {
        wodList(first: $first, after: $after, slug: $slug) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                cursor
                node {
                    id
                    title
                    content
                    titleDate
                    likes {
                        id
                    }
                }
            }
        }
    }
`;

export const DELETE_WOD = gql`
    mutation deleteWod($deleteWodInput:DeleteWodInput!) {
        deleteWod(input:$deleteWodInput) {
            ok
            error
        }
    }
`;

interface IWodList {
    id:number;
    title:string;
    content:string;
    titleDate:Date;
}

export interface IWodEdge {
    cursor:number;
    node:IWodList;
}

interface ICategoryParams {
    slug: string;
}

export const Wods = () => {
    const { data, loading, error } = useMe();
    const history = useHistory();
    const params = useParams<ICategoryParams>();
    const [isOpen, setIsOpen] = useState(false);
    const [topHeight, setTopHeight] = useState<string>("");
    const loader = useRef<HTMLDivElement>(null);
    const [wodTrigger, setWodTrigger] = useState<boolean>(false);
    const [scrollY, setScrollY] = useState(0);
    const [topBtnStatus, setTopBtnStatus] = useState(false); // 버튼 상태

    const onCompleted = (data:deleteWod) => {
        const { deleteWod:{ok, error} } = data;
        if(ok) {
            // handleModalTop();
            handleModalOpen();
        }
    }

    const delay = true;
    const { loading:wodLoading, error:wodListError, data:wodList, fetchMore, refetch, networkStatus } = useQuery<wodList>(WOD_LIST, {
        variables: {
            slug:params.slug
        },
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });
// console.log(wodList);


    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        setWodTrigger(target.isIntersecting);
    }, []);

    const fetchWod = async () => {
        await fetchMore({
            variables: {
                after:wodList?.wodList.pageInfo?.endCursor,
                slug: params.slug,
                delay,
            },
        })
    }

    useEffect(() => {   //일반 함수에는 gql 데이터가 들어가지 않아 트리거를 사용함.
        if(wodList?.wodList.pageInfo?.hasNextPage) {
            if(wodTrigger) {
                fetchWod();
            }
        }
        setWodTrigger(false);
    }, [wodTrigger]);
    
    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if(loader && loader.current) {
            observer.observe(loader.current);
        }
    }, [handleObserver]);

    const [ deleteWod, { loading:deleteLoading } ] = useMutation<deleteWod, deleteWodVariables>(DELETE_WOD, {
        onCompleted,
    })

    const gotoCreateWod = () => {
        history.push("/create-wod");
    }

    const onClickWodDelete = async(id:number) => {
        if(deleteLoading === false) {
            deleteWod({
                variables:{
                    deleteWodInput:{
                        wodId:id,
                    }
                }
            })
        }
    }

    const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setScrollY(0);  // ScrollY 의 값을 초기화
        setTopBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
    }

    const handleFollow = () => {
        setScrollY(window.pageYOffset);
        
        if(scrollY > 200) {
          // 200 이상이면 버튼이 보이게
            setTopBtnStatus(true);
        } else {
          // 200 이하면 버튼이 사라지게
            setTopBtnStatus(false);
        }
    }

    useEffect(() => {
        const watch = () => {
            window.addEventListener('scroll', handleFollow)
        }
        watch();
        return () => {
            window.removeEventListener('scroll', handleFollow)
        }
    })
    
    const handleModalOpen = () => {
        setIsOpen(true);
        setTopHeight(document.documentElement.scrollTop+200+"px");
    };

    const handleModalClose = () => {
        setIsOpen(false);
        location.reload();
    };
    
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
                <title>WOD | CrossfiTogether</title>
            </Helmet>
            <_WodImgContainer>
                <_WodImg backgroundImage={"https://crossfitogether0225.s3.amazonaws.com/crossfit-workout-in-action.png"}></_WodImg> 
                <_WodImgTitle>WOD</_WodImgTitle>
            </_WodImgContainer>
            {data.me.role == UserRole.Coach && (
                <_WodCreateWodButtonContainer>
                    <_WodCreateWodButton onClick={gotoCreateWod}>WOD 추가</_WodCreateWodButton>
                </_WodCreateWodButtonContainer>
            )}
            <_WodListContainer>
                <_WodListSubContainer>
                    <CategoryList />
                    {topBtnStatus && (
                        <_WodGoToTopButton onClick={handleTop}>
                            <span>TOP</span>
                            {/* <_WodFontAwesomeIcon icon={faArrowUpSolid}/> */}
                        </_WodGoToTopButton>
                    )}
                    {wodList?.wodList.edges?.length !== 0
                    ? (
                        wodList?.wodList.edges?.map((wod:IWodEdge) => (
                            <div key={wod.node.title+1}>
                                {data.me.role == UserRole.Coach && (
                                    <_WodUpdateWodLinkContainer>
                                        <div>
                                            <_WodUpdateWodLink to={`/edit-wod/${wod.node.id}`}>수정</_WodUpdateWodLink>
                                        </div>
                                        <div>
                                            <_WodDeleteWodButton onClick={() => onClickWodDelete(wod.node.id)}>삭제</_WodDeleteWodButton>
                                        </div>
                                    </_WodUpdateWodLinkContainer>
                                )}
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
                </_WodListSubContainer>
            </_WodListContainer>
            <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"DELETE COMPLETED!"} modalButtonText={"Close"} top={topHeight}> </ModalBase>
        </>
    )
}