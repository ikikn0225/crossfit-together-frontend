import Spinner from "@/components/spinner";
import { _MyPageContainer, _MyPageHoldListTitleContainer, _MyPageFreeTrialContentTitle, _MyPageHoldContentTitle, _MyPageSubContainer, _MyPageHoldListTitle, _MyPageTitle, _MyPageNoContent } from "@/theme/components/_MyPage";
import { myHolds } from "@/__generated__/myHolds";
import { useQuery } from "@apollo/client";
import { MY_HOLDS } from "../hold/hold";

interface IHold {
    id:number;
    holdAt:Date;
}
export const MyPageHold = () => {
    const { data:myHolds, loading:myPageHoldLoading } = useQuery<myHolds>(MY_HOLDS);

    return (
        <>
            <_MyPageTitle>일시정지</_MyPageTitle>
            <_MyPageHoldContentTitle>Count: {myHolds?.myHolds.holds.length}</_MyPageHoldContentTitle>
            <_MyPageHoldListTitleContainer>
                {myHolds?.myHolds.holds.length !==0
                ?(
                    myHolds?.myHolds.holds.map((hold:IHold) => (
                        <_MyPageHoldListTitle key={hold.id}>{new Date(hold.holdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }).substring(0, 13)} 
                        &nbsp;({new Date(hold.holdAt).toDateString().substring(0, 3)})</_MyPageHoldListTitle>
                    ))
                )
                :(
                    <_MyPageNoContent>Sorry, No Rep!</_MyPageNoContent>
                )}
                {myPageHoldLoading && 
                    <Spinner />
                }
            </_MyPageHoldListTitleContainer>
        </>
    )
}