import React, {useState, useEffect, Dispatch, SetStateAction, useContext, useRef} from "react";
import BoardContainer, { IMove } from "@/components/game/board/BoardContainer";
import Rack from "@/components/game/rack/Rack";
import Scoreboard from '@/components/game/scoreboard/Scoreboard';
import { ITile } from "@/components/game/Tile";
import { useRouter } from "next/router";
import {LobbyContext, LobbyProvider} from "@/context/LobbyContext"
import io from "socket.io-client";
import BoardNavbar from "@/components/game/board/BoardNavbar";
import Head from "next/head";
import GameOverPopup from "@/components/game/GameOverPopup";
const socket = io('http://localhost:8080'); // todo change me on wierzba

export interface ILobby {
    board: ITile[][];
    host: string;
    id: number;
    name: string;
    gameStatus: number;
    players: IPlayer[];
    toMove: number;
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
    const [zoomLevel, setZoomLevel] = useState<number>(1);

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
        centerBoard();
    }, [])


    const getWinner = () : IPlayer => {
        console.log(lobby)
        return lobby.players.reduce((highest, player) => {
            return (highest.score > player.score) ? highest : player;
        }, lobby.players[0]);
        }

    const fetchLobbyAndTiles = () => {
    if (!lobbyId)
        return;

    fetch(`http://localhost:8080/api/lobby/${lobbyId}`)
        .then(lobbyResponse => {
            if (!lobbyResponse.ok) {
               router.push('/lobby');
               return;
            }
            return lobbyResponse.json();
        })
        .then(lobbyData => {
            setLobby(lobbyData);
            const playerId = lobbyData.players.findIndex((p) => p.name === playerName);
            if (playerId === -1) {
                throw new Error("Player not found in lobby");
            }
            return fetch(`http://localhost:8080/api/game/${lobbyId}/get_tiles/${playerId}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tilesData => {
            setRackTiles(tilesData);
            centerBoard();
        })
        .catch(error => {
            console.error('Error - ', error);
        });
};

    useEffect(() => {
    fetchLobbyAndTiles();
    socket.on('board_state', fetchLobbyAndTiles);
}, [lobbyId, playerName, setLobby, setBoardSquares]);

    const containerRef = useRef(null);

    const centerBoard = (): void => {
        console.log(containerRef)
        if (containerRef.current) {
            const container: HTMLDivElement = containerRef.current;
            const scrollTop = container.scrollHeight / 2 - container.clientHeight / 2;
            const scrollLeft = container.scrollWidth / 2 - container.clientWidth / 2;
            container.scrollTo({ top: scrollTop, left: scrollLeft, behavior: 'smooth' });
        }
    }
    const zoomIn = (): void => {
        setZoomLevel(zoomLevel + 0.15)
    };

    const zoomOut = (): void => {
        if (zoomLevel > 0.7)
            setZoomLevel(zoomLevel - 0.15)
    };

    const resetZoom = (): void => {
        setZoomLevel(1);
    }

    return (
        <>
            <Head>
                <title>Game</title>
            </Head>
            <div className={"root"}>
                {lobby ? (
                    <div className={"flex flex-row gap-10"}>
                {lobby.gameStatus === 3 ? <GameOverPopup winner={getWinner()} /> : <></>}
                        <BoardNavbar
                            onCenter={centerBoard}
                            onZoomIn={zoomIn}
                            onZoomOut={zoomOut}
                            onZoomReset={resetZoom}/>
                        <BoardContainer move={move} setMove={setMove} setDragged={setDragged} dragged={dragged}
                                        setRackTiles={setRackTiles} boardSquares={boardSquares}
                                        setBoardSquares={setBoardSquares} zoomLevel={zoomLevel}
                                        containerRef={containerRef}/>
                        <Scoreboard/>
                        <Rack move={move} setMove={setMove} dragged={dragged} setDragged={setDragged}
                              rackTiles={rackTiles} setRackTiles={setRackTiles} setBoardSquares={setBoardSquares}
                              resetMove={() => resetMove(move, setMove, setRackTiles, setBoardSquares)}/>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
);
};

export default GameIndex;
