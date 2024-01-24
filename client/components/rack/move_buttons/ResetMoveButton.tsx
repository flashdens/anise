import React, {Dispatch} from "react";
import {IMove} from "@/components/board/BoardContainer";

interface ResetMoveButtonProps {
    move: IMove[],
    setMove: Dispatch<IMove[]>      
}

const ResetMoveButton: React.FC<ResetMoveButtonProps> = (props: ResetMoveButtonProps) => {

    const resetMove = (move: IMove[], setMove: Dispatch<IMove[]>) => {
        console.log(move);
    }

    return (
       <button className="px-4 py-1 text-xs transition-colors duration-300 rounded-full shadow-xl text-red-100 bg-red-500 hover:bg-red-600 shadow-red-100"
               onClick={() => resetMove(props.move, props.setMove)}>
           reset move
       </button>
    )
}

export default ResetMoveButton;