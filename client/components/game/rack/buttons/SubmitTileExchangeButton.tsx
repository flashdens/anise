import React, {useContext} from "react";
import {IMove} from "@/components/game/board/BoardContainer";
import {LobbyContext} from "@/context/LobbyContext";
import {ITile} from "@/components/game/Tile";

interface SubmitTileExchangeButtonProps {
    exchangedTilesList: ITile[],
    isExchangingTiles: boolean,
    setIsExchangingTiles: any,
    playerMove: boolean,
}

const SubmitMoveButton: React.FC<SubmitTileExchangeButtonProps> = (props: SubmitTileExchangeButtonProps) => {
    const {lobby} = useContext(LobbyContext);
    const playerName = typeof window !== 'undefined' ? localStorage.getItem('playerName'): null;
    const playerId: number = lobby.players.findIndex((p) => p.name === playerName);
    const submitTileExchange = (tiles: ITile[]) => {
        console.log(props.exchangedTilesList)
        fetch(`http://localhost:8080/api/game/${lobby.id}/exchange_tiles/${playerId}`,
             {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({"tiles": tiles, playerName: localStorage.getItem("playerName")})
             })
             .then(async (response: Response) => {
                     // if (!response.ok) {
                     //     props.resetMove();
                     // }
                 }
             )
    };

    return (
        <button className={`px-4 py-1 text-xs transition-colors duration-300 rounded-full shadow-xl text-cyan-100 bg-cyan-500 hover:bg-cyan-600 shadow-cyan-200 
       ${props.playerMove ? '' : 'cursor-not-allowed'} disabled:bg-green-200 dark:shadow-none`}
                disabled={!props.playerMove}
                onClick={() => submitTileExchange(props.exchangedTilesList)}>
            exchange tiles
        </button>
    )
}

export default SubmitMoveButton;
