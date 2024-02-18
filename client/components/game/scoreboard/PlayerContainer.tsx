

import {IPlayer} from "@/components/GameIndex";
import {useContext} from "react";
import {LobbyContext} from "@/context/LobbyContext";

interface PlayerContainerProps {
    player: IPlayer,
    currentlyPlaying: boolean
}

const PlayerContainer = (props: PlayerContainerProps) => {
    const {lobby} = useContext(LobbyContext);
    const playerMove = props.player.name == lobby.players[lobby.toMove].name;

    return (
        <div className={`py-4 justify-center text-center ${playerMove ? "border-4 border-violet-400" : "border border-gray-300"}`}>
            <img
                className="border border-white rounded-full mx-auto mb-2"
                src="/game/avatars/avatar1.jpg"
                alt={props.player.name}
                style={{ padding: '5px' }}
            />
            <h3 className={typeof window !== 'undefined' ? (localStorage.getItem('playerName') === props.player.name ? "font-bold text-pink-600" : "") : ""}>{props.player.name}</h3>
            <p><b>{props.player.score}</b></p>
        </div>
    );
}

export default PlayerContainer;