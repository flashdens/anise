import React from "react";
import {IMove} from "@/components/game/board/BoardContainer";

interface SubmitMoveButtonProps {
    move: IMove[]
}

const SubmitMoveButton: React.FC<SubmitMoveButtonProps> = (props: SubmitMoveButtonProps) => {

   const submitMove = (move: IMove[]) => {
        console.log(move);

        fetch("http://localhost:8080/api/game/send_move/lobby/1/player/1",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"move": move, playerName: "miloszek"})
            })
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error("error fetching response");
                }
                return response.json();
            }).then((data: string) => {
       }
       )};

   return (
       <button className={"px-4 py-1 text-xs transition-colors duration-300 rounded-full shadow-xl text-emerald-100 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200 dark:shadow-none"}
       onClick={() => submitMove(props.move)}>
           submit move
       </button>
   )
}

export default SubmitMoveButton;