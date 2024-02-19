import {IPlayer} from "@/components/GameIndex";
import {useContext} from "react";
import {LobbyContext} from "@/context/LobbyContext";

interface PlayerContainerProps {
    player: IPlayer,
    currentlyPlaying: boolean
}
const PlayerContainer = (props: PlayerContainerProps) => {
    const { lobby } = useContext(LobbyContext);
    const playerMove = props.player.name == lobby.players[lobby.toMove].name;

    return (
        <div className={`mt-10 justify-center text-center ${playerMove ? "border-4 border-violet-400" : "border border-gray-300"} min-w-[150px] min-h-[150px]`}>
            <div className="flex justify-center items-center">
            <img
                className="border border-white rounded-full p-1 w-32 h-32"
                src="/game/avatars/avatar1.jpg"
                alt={props.player.name}
            />
            </div>
            <h3 className={typeof window !== 'undefined' ? (localStorage.getItem('playerName') === props.player.name ? "font-bold text-pink-600" : "") : ""}>{props.player.name}</h3>
            <p><b>{props.player.score}</b></p>
        </div>
    );
}

export default PlayerContainer;
