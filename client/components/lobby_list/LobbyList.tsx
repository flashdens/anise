import {createContext, useEffect, useState} from "react";
import {ITile} from "@/components/game/Tile";
import LobbyListEntry from "@/components/lobby_list/LobbyListEntry";
import NewLobbyButton from "@/components/welcome_screen/NewLobbyButton";

const LobbyList = () => {

    const [lobbies, setLobbies] = useState([]);
       useEffect(() => {
           fetch("http://localhost:8080/api/lobby/get_lobbies")
               .then((response: Response) => {
                   if (!response.ok) {
                       throw new Error("error fetching response");
                   }
                   return response.json();
               })
               .then((data) => {
                   setLobbies(data);
               })
               .catch((error: Error) => {
                   console.error('Error - ', error)
               });
           console.log(lobbies)
       }, []);

    return (
        <div className={""}>
            <h2>available lobbies:</h2>
            <ul>
                {lobbies.map((lobby) => (
                <LobbyListEntry key={lobby.id} lobby={lobby}/>
            ))}
            </ul>
            <NewLobbyButton/>
        </div>
    );
};

export default LobbyList;