import React from "react";
import Link from "next/link";
interface LobbyListEntryProps {
    lobby: any
}
const LobbyListEntry: React.FC<LobbyListEntryProps> = (props: LobbyListEntryProps) => {
    return (
        <Link href={`/lobby/join/${props.lobby.id}`}>
        <li className={"border my-3"} key={props.lobby.id}>
            {props.lobby.name} | {props.lobby.players.length}/4
        </li>
        </Link>
    );
}

export default LobbyListEntry;