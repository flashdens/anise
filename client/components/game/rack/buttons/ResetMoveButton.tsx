import React, {Dispatch, SetStateAction} from "react";
import {IMove} from "@/components/game/board/BoardContainer";

interface ResetMoveButtonProps {
    resetMove: any,
    playerMove: boolean
}

const ResetMoveButton: React.FC<ResetMoveButtonProps> = (props: ResetMoveButtonProps) => {
    return (
       <button className={`px-4 py-1 text-xs transition-colors duration-300 rounded-full shadow-xl text-red-100 bg-red-500 hover:bg-red-600 shadow-red-200 disabled:bg-red-200 
       $ dark:shadow-none ${props.playerMove ? '' : "cursor-not-allowed"}`}
               onClick={() => props.resetMove()}>
           reset move
       </button>
    )
}

export default ResetMoveButton;