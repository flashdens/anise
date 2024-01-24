/**
 * TODO:
 * - implement reset move
 */

import React, {Dispatch, useEffect, useState} from "react";

import Tile, {ITile} from "@/components/Tile";
import BoardNavbar from "@/components/board/BoardNavbar";
import assert from "assert";

export interface IMove {
    tile: ITile
    i: number
}

interface BoardContainerProps {
    move: IMove[],
    setMove: React.Dispatch<React.SetStateAction<IMove[]>>;
    dragged: ITile|null,
    setDragged: Dispatch<ITile>,
    setRackTiles: React.Dispatch<React.SetStateAction<ITile[]>>;
}

const BoardContainer: React.FC<BoardContainerProps> = (props: BoardContainerProps) => {
    const [boardSquares, setBoardSquares] = useState<(ITile|undefined)[]>([]);
    const [zoomLevel, setZoomLevel] = useState<number>(1);

    useEffect(() => {
        const squares: (ITile|undefined)[] = [];
        for (let i : number = 0; i < 2601; i++) {
            squares.push(
                undefined
            )
        }

        setBoardSquares(squares);
    }, []);

    const onDragStart = (e: any, tile: ITile) => {
        e.dataTransfer.setData("draggedTile", JSON.stringify({
            tile : tile,
            i: e.target.getAttribute('i')
        }));
        props.setDragged(tile);
        console.log(e.target);
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

        if (boardSquares[positionIndex]) {
            console.log("[debug] a tile is already there");
            return;
        }

        setBoardSquares((prevBoard: (ITile|undefined)[]) => {
            const newBoard: (ITile|undefined)[] = [...prevBoard];
            newBoard[positionIndex] = tileData.tile;

            if (tileData.i)
                newBoard[tileData.i] = undefined;

            return newBoard;
        });

        const currentMove: IMove = {
            tile: tileData,
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

    const centerBoard = (): void => {
        console.log("TODO")
    };

    const zoomIn = (): void => {
        console.log(Math.round(zoomLevel * 100));
    };

    const zoomOut = (): void => {
        console.log(Math.round(zoomLevel * 100));
    };

    const resetZoom = (): void => {
        setZoomLevel(1);
    }

    const renderBoard = () => {
        const squares = [];
        for (let i: number = 0; i < 2601; i++) {
            const tile: ITile|undefined = boardSquares[i];

            if (i == 0) {
                console.log(tile);
                console.log(props.move[0]);
                }

            const isTileInMove: boolean =
                tile !== undefined && props.move.some(moveItem =>
                moveItem.tile.symbol == tile.symbol &&
                moveItem.tile.color == tile.color &&
                moveItem.tile.id == tile.id
    );

            squares.push(
                    <React.Fragment key={i}>
                        <Tile
                        i={i}
                        extraStyles={i == 1300 ? 'bg-cyan-300' : ''}
                        isOnRack={false}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragStart={onDragStart}
                        draggable={isTileInMove}
                        {...(tile !== undefined && {tile: tile})}
                    />
                    </React.Fragment>
            );
        }
        return squares;
    };

  return (
      <div className="flex p-6 items-center h-screen w-[80%]">
          <div className={"board-navbar"}>
            <BoardNavbar
                onCenter={centerBoard}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onZoomReset={resetZoom}
            />
          </div>
        <div className="board-container h-[75%] overflow-scroll">
            <div style={{transform: `scale(${zoomLevel})`}} className={`grid grid-cols-51 grid-rows-51 transition-transform duration-300`}>
                {renderBoard()}
            </div>
        </div>
      </div>
  );
};


export default BoardContainer;