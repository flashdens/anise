import Tile, {ITile} from "@/components/Tile";
import React, {Dispatch, useState} from "react";
import SubmitMoveButton from "@/components/rack/move_buttons/SubmitMoveButton";
import {IMove} from "@/components/board/BoardContainer";
import ResetMoveButton from "@/components/rack/move_buttons/ResetMoveButton";
import Image from "next/image";
interface RackProps {
    initTiles: ITile[],
    move: IMove[]
    setMove: Dispatch<IMove[]>
    dragged: ITile|null,
    setDragged: Dispatch<ITile|null>,
    rackTiles: ITile[],
    setRackTiles: React.Dispatch<React.SetStateAction<ITile[]>>;
}

export const Rack: React.FC<RackProps> = (props: RackProps) => {
    const [isRackVisible, setIsRackVisible] = useState<boolean>(true);

    const changeRackVisibility = () => {
        setIsRackVisible(!isRackVisible);
    }

    const onDragStart = (e: any, tile: ITile) => {
        props.setDragged(tile);
        e.dataTransfer.setData("draggedTile", JSON.stringify({tile: tile}));
    }

    const onDragOver = (e: any) => {
        e.preventDefault();
    }

    const onDrop = (e: any, targetTile: any) => {
        e.preventDefault();

        let newTiles: ITile[] = props.rackTiles.map(tile => {
            if (tile.id === targetTile.id)
                return props.dragged;
            // @ts-ignore
            else if (tile.id == props.dragged.id)
                return targetTile;
            else
                return tile;
        })

        if (props.dragged != null)
                // @ts-ignore
                props.setRackTiles(prevTiles => prevTiles.filter(removedTile => props.dragged.id !== removedTile.id));

        props.setRackTiles(newTiles);
        props.setDragged(null);
    };


    return (
        <div className={"container"}>
          <button
            onClick={changeRackVisibility}
            className={`fixed bottom-16 left-1/2 -translate-x-1/2 px-4 py-2 text-xs bg-white border text-white rounded`}
          >
            <Image src='/buttons/up-arrow.svg' alt='Toggle Rack' height={20} width={20} className={`${isRackVisible ? '' : 'animate-flip fill-mode-forwards' }`}/>
          </button>
           { isRackVisible &&
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 "
            style={{pointerEvents: isRackVisible ? 'all' : 'none'}}>
                <div className="rack inline-flex space-x-1.5 bg-white p-6 shadow-md rounded-lg">
                    <ResetMoveButton move={props.move} setMove={props.setMove}/>
                    {props.rackTiles.map((tile, index) => (
                        <Tile
                            key={index}
                            tile={tile}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            isOnRack={true}
                            extraStyles={'h-8 w-8'}
                        />
                    ))}
                    <SubmitMoveButton move={props.move}/>
                </div>
            </div>
           }
       </div>
    );
};

export default Rack;