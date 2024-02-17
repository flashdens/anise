import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from "react";
import BoardContainer, { IMove } from "@/components/game/board/BoardContainer";
import Rack from "@/components/game/rack/Rack";
import Scoreboard from '@/components/game/scoreboard/Scoreboard';
import { ITile } from "@/components/game/Tile";
import { useRouter } from "next/router";
import {LobbyContext, LobbyProvider} from "@/context/LobbyContext"
import io from "socket.io-client";
const socket = io('http://localhost:8080'); // todo change me on wierzba

export interface ILobby {
    host: string;
    id: number;
    name: string;
    players: IPlayer[];
}

export interface IPlayer {
    name: string;
    score: number;
}

const GameIndex = () => {
    // @ts-ignore
    const [rackTiles, setRackTiles] = useState<ITile[]>([Array(2601).fill(undefined)]);
    const { lobby, setLobby } = useContext(LobbyContext);
    const [boardSquares, setBoardSquares] = useState<(ITile|undefined)[]>([]);
    const router = useRouter();
    const lobbyId = router.query.id as string;
    const playerName = typeof window !== 'undefined' ? localStorage.getItem('playerName') : null;
    const [move, setMove] = useState<IMove[]>([]);
    const [dragged, setDragged] = useState<ITile | null>(null);
    const [playerTurn, setPlayerTurn] = useState(false)
    let playerId: number;

    const resetMove = (move: IMove[], setMove: Dispatch<SetStateAction<IMove[]>>, setRackTiles: Dispatch<SetStateAction<ITile[]>>, setBoardSquares: Dispatch<SetStateAction<(ITile | undefined)[]>>) => {
        setRackTiles(prevRackTiles => {
            const moveTiles = move.map(m => m.tile);
            return prevRackTiles.concat(moveTiles);
        });

        setBoardSquares(prevBoardSquares => {
            return prevBoardSquares.map((square, index) => {
                if (move.some(m => m.i === index)) {
                    return undefined;
                }
                return square;
            });
        });

        setMove([]);
    };

    useEffect(() => {
        const squares: (ITile|undefined)[] = [];
        for (let i : number = 0; i < 2601; i++) {
            squares.push(
                undefined
            )
        }
        setBoardSquares(squares);
    }, [])


    useEffect(() => {
        if (!lobbyId) return;

        fetch(`http://localhost:8080/api/lobby/${lobbyId}`)
            .then(lobbyResponse => {
                if (!lobbyResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                return lobbyResponse.json();
            })
            .then(lobbyData => {
                setLobby(lobbyData);
                playerId = lobbyData.players.findIndex((p) => p.name === playerName);
                console.log(playerName)
                if (playerId === -1) {
                    throw new Error("Player not found in lobby");
                }

                return fetch(`http://localhost:8080/api/game/${lobbyId}/get_tiles/${playerId + 1}`);
            })
            .then(tilesResponse => {
                if (!tilesResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                return tilesResponse.json();
            })
            .then(tilesData => {
                setRackTiles(tilesData);
            })
            .catch(error => {
                console.error('Error - ', error);
            });
    }, [lobbyId, playerName, setLobby, setRackTiles]);

    return (
            <div className={"root"}>
                <div className={"flex flex-row"}>
                    <BoardContainer move={move} setMove={setMove} setDragged={setDragged} dragged={dragged} setRackTiles={setRackTiles} boardSquares={boardSquares} setBoardSquares={setBoardSquares}/>
                    {lobby? <Scoreboard/> : <div>Loading...</div>}
                </div>
                <Rack move={move} setMove={setMove} dragged={dragged} setDragged={setDragged} rackTiles={rackTiles} setRackTiles={setRackTiles} setBoardSquares={setBoardSquares} resetMove={resetMove} playerTurn={playerTurn} lobby={lobby}/>
            </div>
    );
};

export default GameIndex;
