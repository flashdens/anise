import React from "react";
import {IMove} from "@/components/board/BoardContainer";

interface SubmitMoveButtonProps {
    move: IMove[]
}

const SubmitMoveButton: React.FC<SubmitMoveButtonProps> = (props: SubmitMoveButtonProps) => {

   const submitMove = (move: IMove[]) => {
        console.log(move);
        console.log("todo: this button will be used to submit moves.");
   }

   return (
       <button className={"px-4 py-1 text-xs transition-colors duration-300 rounded-full shadow-xl text-emerald-100 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100"}
       onClick={() => submitMove(props.move)}>
           submit move
       </button>
   )
}

export default SubmitMoveButton;