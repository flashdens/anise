import React, {useContext} from "react";
import {IMove} from "@/components/game/board/BoardContainer";
import {IPlayer} from "@/pages/game/[id]";
import {Simulate} from "react-dom/test-utils";
import {object} from "prop-types";
import {LobbyContext} from "@/context/LobbyContext";

interface SubmitMoveButtonProps {
    move: IMove[],
    resetMove: any,
    playerMove: boolean,
}

const SubmitMoveButton: React.FC<SubmitMoveButtonProps> = (props: SubmitMoveButtonProps) => {
    const {lobby} = useContext(LobbyContext);
    const playerName = typeof window !== 'undefined' ? localStorage.getItem('playerName'): null;
    const playerId: number = lobby.players.findIndex((p) => p.name === playerName);
   const submitMove = (move: IMove[]) => {

        fetch(`http://localhost:8080/api/game/send_move/lobby/${lobby.id}/player/${playerId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"move": move, playerName: localStorage.getItem("playerName")})
            })
            .then(async (response: Response) => {
                if (!response.ok) {
                    props.resetMove();
                }
            }
       )};

   return (
       <button className={`px-4 py-1 text-xs transition-colors duration-300 rounded-full shadow-xl text-emerald-100 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200 
       ${props.playerMove ? '' : 'cursor-not-allowed'} disabled:bg-green-200 dark:shadow-none`}
               disabled={!props.playerMove}
       onClick={() => submitMove(props.move)}>
           submit move
       </button>
   )
}

export default SubmitMoveButton;