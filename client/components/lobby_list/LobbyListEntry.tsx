import React from "react";

interface LobbyListEntryProps {
    lobby: any
}
const LobbyListEntry: React.FC<LobbyListEntryProps> = (props: LobbyListEntryProps) => {
    return (
        <li className={"border my-3"} key={props.lobby}>
            {props.lobby} | 1/4
        </li>
    );
}

export default LobbyListEntry;