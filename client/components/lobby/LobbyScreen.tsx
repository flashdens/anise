'use client';

import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useRouter} from "next/router";
const socket = io('http://localhost:8080'); // todo change me on wierzba
interface LobbyScreenProps {
    isLobbyAdmin: boolean;
    lobby: any;
}

const LobbyScreen: React.FC<LobbyScreenProps> = (props: LobbyScreenProps) => {
    const [players, setPlayers] = useState(props.lobby.players);
    const playerName: string|null = typeof window !== 'undefined' ? localStorage.getItem('playerName') : ''
    const router = useRouter();

    const handleKickPlayer = (playerId: number) => {
        // Implement logic to kick the player with playerId
    };

    const handleStartGame = () => {
        console.log(props.lobby.id)
        socket.emit('start_game', props.lobby.id);
    };

    useEffect(() => {
    socket.on('game_started', (data: any) => {
        console.log("maybe?")
        console.log(data.lobby_id);
        console.log(props.lobby.id);
        if (data.lobby_id === props.lobby.id) {
            router.push(`/game/${data.lobby_id}`);
        }
    }), [props.lobby.id, router];

    return () => {
        socket.off('game_started');
    };

}, [props.lobby.id, router]);

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">{props.lobby.name}</h2>
            <h3 className="text-lg font-bold mb-2">Players:</h3>
            <ul>
                {players.map((player: any, index: number) => (
                    <li key={index} className={`mb-2 flex items-center justify-between ${player.name == playerName ? 'bg-green-400' : ''}`}>
                        <span>{player.name}</span>
                    </li>
                ))}
            </ul>

            {props.isLobbyAdmin && (
                <button
                    className="w-full p-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={handleStartGame}
                >
                    Start Game
                </button>
            )}
        </div>
    );
};

export default LobbyScreen;
