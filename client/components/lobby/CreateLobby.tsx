import {createContext, useState} from 'react';
import { useRouter } from "next/navigation";

const CreateLobby = ({ }) => {
    const [lobbyName, setLobbyName] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [lobbyId, setLobbyId] = useState()
    const router = useRouter();

    const handleCreateLobby = async () => {
        if (!lobbyName) {
            throw new Error('A name is required!');
        }
        // @ts-ignore
        fetch('http://localhost:8080/api/lobby/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"lobbyName": lobbyName, "playerName": playerName}),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Failed to create lobby');
            }
            return response.json();
        })
            .then((data) => {
                setLobbyId(data.lobby_id);
                localStorage.setItem("playerName", playerName)
                router.push(`/lobby/join/${data.lobby_id}`)
            })
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 border rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Create Lobby</h1>
            <input
                required
                className="w-full p-2 mb-4 border rounded-md dark:bg-black "
                type="text"
                placeholder="Enter Lobby Name"
                value={lobbyName}
                onChange={(e) => setLobbyName(e.target.value)}
            />
            <input
                required
                className="w-full p-2 mb-4 border rounded-md dark:bg-black"
                type="text"
                placeholder="Enter Your Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-200"
                onClick={handleCreateLobby}
                disabled={!lobbyName.trim()}
            >
                Create Lobby
            </button>
        </div>
    );
}

export default CreateLobby;