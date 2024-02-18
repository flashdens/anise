/**
 * TODO:
 * - implement reset move
 */

import React, {Dispatch, useContext, useEffect, useRef, useState} from "react";

import Tile, {ITile} from "@/components/game/Tile";
import BoardNavbar from "@/components/game/board/BoardNavbar";
import assert from "assert";
import io from "socket.io-client";
import {LobbyContext} from "@/context/LobbyContext";
const socket = io('http://localhost:8080');

export interface IMove {
    tile: ITile
    i: number
}





interface BoardContainerProps {
    move: IMove[],
    setMove: React.Dispatch<React.SetStateAction<IMove[]>>;
    dragged: ITile|null,
    setDragged: Dispatch<ITile>,
    setRackTiles: React.Dispatch<React.SetStateAction<ITile[]>>,
    boardSquares: any,
    setBoardSquares: any
}

const BoardContainer: React.FC<BoardContainerProps> = (props: BoardContainerProps) => {
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const {lobby} = useContext(LobbyContext);

const handleBoardState = (boardState: ITile[][]) => {
            props.setBoardSquares((prevBoard: string | any[]) => {
                const newBoard = prevBoard.slice();
                for (let i = 0; i < 50; i++) {
                    for (let j = 0; j < 50; j++) {
                        if (boardState[i][j]) {
                            // @ts-ignore
                            newBoard[j * 51 + i] = {color: boardState[i][j].color, symbol: boardState[i][j].symbol, id: boardState[i][j].id}
                        }
                    }
                }
                return newBoard;
            });
        };


    useEffect(() => {
        socket.on('board_state', handleBoardState);

        return () => {
            socket.off('board_state', handleBoardState);
        };
    }, [handleBoardState, props.setBoardSquares, props.boardSquares]);


    useEffect(() => {
      handleBoardState(lobby.board)
        centerBoard();
    }, [lobby.board]);

    const onDragStart = (e: any, tile: ITile) => {
        const tileIndexInMove = props.move.findIndex(move => move.tile.id === tile.id);

        if (tileIndexInMove !== -1) {
            const newMove = [...props.move];
            newMove.splice(tileIndexInMove, 1);
            props.setMove(newMove);

            e.dataTransfer.setData("draggedTile", JSON.stringify({
                tile: tile,
                i: e.target.getAttribute('i')
            }));
            props.setDragged(tile);
        }
    }

    const onDrop = (e: any) => {
        e.preventDefault();
        const droppedOn: HTMLElement = e.target as HTMLElement;

        if (!droppedOn.hasAttribute('i')) {
            console.log("[debug] the tile was dropped off-board")
            return;
        }

        // @ts-ignore
        const i : number = parseInt(droppedOn.getAttribute('i'));
        const x: number|null = i % 51;
        const y: number|null = Math.floor(i / 51);

        if (x == null || y == null) {
            console.log("[debug] tile has no coordinates")
            return;
        }


        const tileData = JSON.parse(e.dataTransfer.getData("draggedTile"));
        const positionIndex: number = y * 51 + x;

        if (props.boardSquares[positionIndex]) {
            console.log("[debug] a tile is already there");
            return;
        }

        props.setBoardSquares((prevBoard: (ITile|undefined)[]) => {
            const newBoard: (ITile|undefined)[] = [...prevBoard];
            newBoard[positionIndex] = tileData.tile;

            if (tileData.i)
                newBoard[tileData.i] = undefined;

            return newBoard;
        });

        const currentMove: IMove = {
            tile: tileData.tile,
            i: positionIndex
        }

        props.setMove((prevMove: IMove[]) => [...prevMove, currentMove]);
        console.log(props.move);

        if (!props.dragged)
            assert(false);

        props.setRackTiles((prevRackTiles: ITile[]) =>
        // @ts-ignore
            prevRackTiles.filter(tile => tile.id !== props.dragged.id)
        );

        renderBoard();
    };

    const onDragOver = (e: any): void => {
        e.preventDefault();
    }


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

    const renderBoard = () => {
    return props.boardSquares.map((tile: ITile | undefined, index: React.Key | null | undefined) => {
        const isTileInMove = props.move.some(moveItem => moveItem.i === index);

        return (
                <Tile
                    i={index}
                    key={index}
                    extraStyles={index === 1300 ? 'bg-cyan-300' : ''}
                    isOnRack={false}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    draggable={isTileInMove}
                    tile={tile}
                >
                    {tile?.id}
                </Tile>
        );
    });
};;

  return (
      <div className="flex items-center h-screen w-[80%]">
          <div className={"board-navbar flex gap-2"}>
            <BoardNavbar
                onCenter={centerBoard}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onZoomReset={resetZoom}
            />
          </div>
        <div className="board-container flex-grow h-[75%] overflow-scroll"
                ref={containerRef}
        >
            <div
                style={{transform: `scale(${zoomLevel})`}} className={`grid grid-cols-51 grid-rows-51 transition-transform duration-300`}>
                {renderBoard()}
            </div>
        </div>
      </div>
  );
};


export default BoardContainer;