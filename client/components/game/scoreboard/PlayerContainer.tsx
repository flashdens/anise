import {IPlayer} from "@/pages/game/[id]";

interface PlayerContainerProps {
    player: IPlayer
}


const PlayerContainer = (props: PlayerContainerProps) => {


    return (
        <div className={"py-4 justify-center text-center"}>
            <img
                className={"border border-white"}
                src="/game/avatars/avatar1.jpg"
                alt={""}/>
            <h3>{props.player.name}</h3>
            <p><b>{props.player.score}</b></p>
        </div>
    )
}

export default PlayerContainer;