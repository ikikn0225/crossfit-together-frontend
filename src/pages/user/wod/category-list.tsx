import { Category } from "@/components/category";
import { _WodCategoryContainer, _WodCategoryFontAwesomeIcon } from "@/theme/components/_Wod";
import { allCategories } from "@/__generated__/allCategories";
import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { ALL_CATEGORIES } from "../../coach/create-wod";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

let TOTAL_SLIDES = 3;
export const CategoryList = () => {
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
        let currentSlideTranslate = currentSlide * 60;
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlideTranslate}%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만든다.
    }, [currentSlide]);
    return (
        <div>
            <div onClick={prevSlide}>
                <_WodCategoryFontAwesomeIcon icon={faAngleLeft}  />
            </div>
            <div></div>
            <_WodCategoryContainer ref={slideRef}>
                {categories?.allCategories.categories?.map((cate:{id:number, name:string, slug:string}) => (
                    <Category
                        key={cate.id}
                        id={cate.id}
                        name={cate.name}
                        slug={cate.slug}
                    />
                ))}
            </_WodCategoryContainer>
            <div></div>
            <div onClick={nextSlide}>
                <_WodCategoryFontAwesomeIcon icon={faAngleRight}  />
            </div>
        </div>
    )
}