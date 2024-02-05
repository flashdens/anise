import React from "react";
import {IMove} from "@/components/game/board/BoardContainer";
import {IPlayer} from "@/pages/game/[id]";
import {Simulate} from "react-dom/test-utils";
import {object} from "prop-types";

interface SubmitMoveButtonProps {
    move: IMove[],
    resetMove: any,
    playerMove: boolean
}

const SubmitMoveButton: React.FC<SubmitMoveButtonProps> = (props: SubmitMoveButtonProps) => {

   const submitMove = (move: IMove[]) => {

        fetch("http://localhost:8080/api/game/send_move/lobby/1/player/1",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"move": move, playerName: localStorage.getItem("playerName")})
            })
            .then(async (response: Response) => {
                if (!response.ok) {
                    const json = await response.json();
                    props.resetMove();
                }
                return response.json();
            }
       )};

   return (
       <button className={`px-4 py-1 text-xs transition-colors duration-300 rounded-full shadow-xl text-emerald-100 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200 
       ${props.playerMove ? '' : 'cursor-not-allowed'} disabled:bg-green-200 dark:shadow-none`}
       onClick={() => submitMove(props.move)}>
           submit move
       </button>
   )
}

export default SubmitMoveButton;