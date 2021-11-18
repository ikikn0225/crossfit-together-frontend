import { _HoldSpan } from "@/theme/_Hold";


interface IHoldListProps {
    holdAt:Date;
    ownerId:number;
    ownerName:string;
}

export const HoldList:React.FC<IHoldListProps> = ({holdAt, ownerId, ownerName}) => {
    return(
        <>
            <_HoldSpan>{holdAt}</_HoldSpan>

        </>
    );
}