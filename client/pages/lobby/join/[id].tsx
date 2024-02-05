import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
    const [playerName, setPlayerName] = useState(typeof window !== 'undefined' ? localStorage.getItem('playerName') : '');
    const router = useRouter();
    const lobbyId = router.query.id;

    useEffect(() => {
        if (playerName) {
            router.push(`/lobby/${lobbyId}`);
        }
    }, [playerName, lobbyId]);

    const handleJoinLobby = (event: { preventDefault: () => void; target: { playerName: { value: any; }; }; }) => {
        event.preventDefault();

        const enteredName = event.target.playerName.value;
        if (!enteredName) {
            console.error('Player name is required');
            return;
        }

        setPlayerName(enteredName);

        fetch(`http://localhost:8080/api/lobby/join/${lobbyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "playerName": enteredName }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to join lobby');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("playerName", enteredName);
                router.push(`/lobby/${lobbyId}`);
            })
            .catch((error) => {
                console.error('Error joining lobby', error);
            });
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Join Lobby</h1>
            <form onSubmit={handleJoinLobby}>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                    Enter your name:
                </label>
                <input
                    type="text"
                    name="playerName"
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
        </div>
    );
};

export default Index;
