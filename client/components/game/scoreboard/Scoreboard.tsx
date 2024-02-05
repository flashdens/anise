import PlayerContainer from '@/components/game/scoreboard/PlayerContainer';
import {ILobby, IPlayer} from "@/pages/game/[id]";
import {ReactElement} from "react";

interface ScoreboardProps{
    lobby: ILobby
}
const Scoreboard = (props: ScoreboardProps) => {
    const renderScoreboard = () => {
        props.lobby
        const players: ReactElement[] = [];
        for (let i: number = 0; i < props.lobby.players.length; ++i) {
            players.push(
                        <PlayerContainer
                            key={i}
                            player={props.lobby.players[i]}
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