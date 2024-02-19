'use client';

import Head from 'next/head';
import LobbyScreen from "@/components/lobby/LobbyScreen";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {useRouter} from "next/router";

interface ILobby {
    id: string,
    name: string,
    host: string,
    players: string[]
}

const Index = () => {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [lobby, setLobby] = useState<ILobby | undefined>(undefined);
    const lobbyId = router.query.id as string;
    const [playerName, setPlayerName] = useState<string | null>(null);

        useEffect(() => {
        if (typeof window !== 'undefined') {
            setPlayerName(localStorage.getItem('playerName'));
        }
    }, [])
        ;
    useEffect(() => {
        fetch(`http://localhost:8080/api/lobby/${lobbyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // if (!data.players.some((player: { name: string | null; }) => player.name === playerName)) {
                //     router.push('/lobby');
                // }
                setLobby(data);
            })
            .catch((error) => {
                console.error('Error joining lobby', error);
            });
    }, [lobbyId, router]); // Dependency array: fetch the lobby data when lobbyId changes


    return (
        <>
            <Head>
                <title>Game Lobby</title>
            </Head>

            <div className="p-4">
                <div className="container flex flex-col justify-between items-center  text-center max-w-lg mx-auto">
                    {lobby ?
                        <LobbyScreen
                            isLobbyAdmin={typeof window !== 'undefined' ? localStorage.getItem('playerName') === lobby.host : false}
                            lobby={lobby}
                        />
                        :
                        <div>
                        <p>Loading lobby...</p>
                        <span>If this loads for too long, then I screwed something up</span>
                        </div>

                    }
                </div>
            </div>
        </>
    );
};

export default Index;

