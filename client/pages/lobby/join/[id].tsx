
import React, { useState } from 'react';
import { useRouter } from 'next/router'
const Index = ({}) => {
    const [playerName, setPlayerName] = useState('');
    const router = useRouter();
    const lobbyId = router.query.id;
    const [joinLobbyMessage, setJoinLobbyMessage] = useState('');

    const handleJoinLobby = () => {
        if (!playerName) {
            console.error('Player name is required');
            return;
        }

        fetch(`http://localhost:8080/api/lobby/join/${lobbyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"playerName": playerName}),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to join lobby');
                }
                return response.json();
            })
            .then((data) => {
                setJoinLobbyMessage(data.message);
            })
            .catch((error) => {
                console.error('Error joining lobby', error);
            });
            router.push(`/lobby/${lobbyId}`)
    };

    return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Join Lobby</h1>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleJoinLobby();
        }}>
            <label className="block mb-2 text-sm font-bold text-gray-700">
                Enter your name:
            </label>
            <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md"
                placeholder="Your Name"
            />
            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Join Lobby
            </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
            {joinLobbyMessage}
        </div>
    </div>
);
};

export default Index;
