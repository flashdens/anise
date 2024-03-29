import React, {useContext} from "react";
import {IMove} from "@/components/game/board/BoardContainer";
import {LobbyContext} from "@/context/LobbyContext";
import {useFlashMessage} from "@/context/FlashMessageContext";

interface SubmitMoveButtonProps {
    move: IMove[],
    resetMove: any,
    playerMove: boolean,
    setMove: any
}

const SubmitMoveButton: React.FC<SubmitMoveButtonProps> = (props: SubmitMoveButtonProps) => {
    const {lobby} = useContext(LobbyContext);
    const playerName = typeof window !== 'undefined' ? localStorage.getItem('playerName'): null;
    const playerId: number = lobby.players.findIndex((p) => p.name === playerName);
    const {showMessage} = useFlashMessage();
    const submitMove = () => {
    fetch(`http://localhost:8080/api/game/send_move/lobby/${lobby.id}/player/${playerId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "move": props.move, playerName: localStorage.getItem("playerName") })
    })
    .then(async (response) => {
    let responseData;
    try {
        responseData = await response.json(); // Attempt to parse JSON
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }

    if (!response.ok) {
        // Handle error
        props.resetMove();
        if (responseData) {
            // Use the JSON payload for the error message
            showMessage(responseData.message, 'error'); // Assuming 'message' is the key in your JSON response
        }
    } else {
        // Handle success
        props.setMove([]);
    }

})
    .catch(error => {
      showMessage(`An error occurred: ${error.message}`, 'error'); // Display flash message for network errors
    });
  };

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