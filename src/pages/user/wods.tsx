import { Wod } from "@/components/wod";
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
    _WodFontAwesomeIcon
} from "@/theme/components/_Wod"
import { allCategories } from "@/__generated__/allCategories";
import { allWods } from "@/__generated__/allWods";
import { deleteWod, deleteWodVariables } from "@/__generated__/deleteWod";
import { UserRole } from "@/__generated__/globalTypes";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async"
import { Link, useHistory } from "react-router-dom";
import { ALL_CATEGORIES } from "../coach/create-wod";
import ModalBase from "../modal-base";
import { useParams } from "react-router"
import { Category } from "@/components/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const ALL_WODS = gql`
    query allWods($input:AllWodsInput!) {
        allWods(input:$input) {
            ok
            error
            wods {
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

interface ICategoryParams {
    slug: string;
}
let TOTAL_SLIDES = 2;
export const Wods = () => {
    const { data, loading, error } = useMe();
    const history = useHistory();
    const params = useParams<ICategoryParams>();
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [topHeight, setTopHeight] = useState<string>("");
    const { data:categories } = useQuery<allCategories>(ALL_CATEGORIES);

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);
    const nextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };
    const prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };
    useEffect(() => {
        if (slideRef === null || slideRef.current === null) {
            return;
        }
        if(slideRef.current.offsetWidth > 750) {
            TOTAL_SLIDES = 1;
        }
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide}05%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }, [currentSlide]);

    const onCompleted = (data:deleteWod) => {
        const { deleteWod:{ok, error} } = data;
        if(ok) {
            // handleModalTop();
            handleModalOpen();
        }
    }

    const { data:wods } = useQuery<allWods>(ALL_WODS, {
        variables: {
            input: {
                slug: params.slug,
            }
        }
    });
    const [ deleteWod, { loading:deleteLoading } ] = useMutation<deleteWod, deleteWodVariables>(DELETE_WOD, {
        onCompleted,
    })

    const gotoCreateWod = () => {
        history.push("/create-wod");
    }

    const onClickDelete = async(id:number) => {
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
                    <_WodCreateWodButton onClick={gotoCreateWod}>Create Wod</_WodCreateWodButton>
                </_WodCreateWodButtonContainer>
            )}
            <_WodListContainer>
                <_WodListSubContainer>
                    <div>
                        <div>
                        <_WodFontAwesomeIcon onClick={prevSlide} icon={faAngleLeft}  />
                        </div>
                        <_WodCategoryContainer ref={slideRef}>
                        {categories?.allCategories.categories.map((cate:{id:number, name:string}) => (
                            <Category
                                key={cate.id}
                                id={cate.id}
                                name={cate.name}
                            />
                        ))}
                        </_WodCategoryContainer>
                        <div>
                        <_WodFontAwesomeIcon onClick={nextSlide} icon={faAngleRight}  />
                        </div>
                    </div>
                    {wods?.allWods.wods?.length !== 0 
                    ? (
                        wods?.allWods.wods?.map((wod:IWodList) => (
                            <Wod 
                                key={wod.title}
                                role={data.me.role}
                                id={wod.id}
                                title={wod.title}
                                titleDate={wod.titleDate}
                                content={wod.content}
                                onClickDelete={onClickDelete}
                            />
                        ))
                    )
                    : (
                        <_WodNoContent>Sorry, No Rep!</_WodNoContent>
                    )}
                </_WodListSubContainer>
            </_WodListContainer>
            <ModalBase visible={isOpen} onClose={handleModalClose} modalContentText={"DELETE COMPLETED!"} modalButtonText={"Close"} top={topHeight}> </ModalBase>
        </>
    )
}