import PlayerContainer from '@/components/game/scoreboard/PlayerContainer';
import {ILobby, IPlayer} from "@/components/GameIndex";
import React, {ReactElement, useContext, useEffect} from "react";
import {LobbyContext} from "@/context/LobbyContext";

const Scoreboard = () => {
    const {lobby, setLobby} = useContext(LobbyContext);
    console.log(lobby)
    const renderScoreboard = () => {
        const players: ReactElement[] = [];
        for (let i: number = 0; i < lobby.players.length; ++i) {
            players.push(
                        <PlayerContainer
                            key={i}
                            player={lobby.players[i]}
                            currentlyPlaying={lobby.currentTurnOf == i + 1}
                        />
            )
        }
            return players;
}

    return (
        <div className={"scoreboard flex-col"}>
        {renderScoreboard()}
        </div>
    );
}

export default Scoreboard;