import React from "react";
import {IMove} from "@/components/game/board/BoardContainer";

interface SubmitMoveButtonProps {
    move: IMove[]
}

const SubmitMoveButton: React.FC<SubmitMoveButtonProps> = (props: SubmitMoveButtonProps) => {

   const submitMove = (move: IMove[]) => {
        console.log(move);
        console.log("todo: this button will be used to submit moves.");

        fetch("http://localhost:8080/api/receive_move",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(move)
            })
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error("error fetching response");
                }
                console.log("The request returned: " + response.status);
                return response.json();
            }).then((data: string) => {
                console.log("Data received: " + JSON.stringify(data));
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