import Tile, {ITile} from "@/components/game/Tile";
import React, {Dispatch, useState} from "react";
import SubmitMoveButton from "@/components/game/rack/buttons/SubmitMoveButton";
import {IMove} from "@/components/game/board/BoardContainer";
import ResetMoveButton from "@/components/game/rack/buttons/ResetMoveButton";
import RackVisibilityButton from "@/components/game/rack/buttons/RackVisibilityButton";
import {ILobby} from "@/pages/game/[id]";
interface RackProps {
    move: IMove[]
    setMove: Dispatch<IMove[]>
    dragged: ITile|null,
    setDragged: Dispatch<ITile|null>,
    rackTiles: ITile[],
    setRackTiles: React.Dispatch<React.SetStateAction<ITile[]>>,
    setBoardSquares: any
    lobby: ILobby,
    resetMove: any
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
            <RackVisibilityButton changeRackVisibility={changeRackVisibility} isRackVisible={isRackVisible}/>
           { isRackVisible &&
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 "
            style={{pointerEvents: isRackVisible ? 'all' : 'none'}}>
                <div className="rack inline-flex space-x-1.5 border p-6 shadow-md rounded-lg">
                    <ResetMoveButton resetMove={props.resetMove}/>
                    {props.rackTiles.map((tile, index) => (
                        <Tile
                            draggable={true}
                            key={index}
                            tile={tile}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            isOnRack={true}
                            extraStyles={'h-8 w-8'}
                        />
                    ))}
                    <SubmitMoveButton move={props.move} resetMove={props.resetMove}/>
                </div>
            </div>
           }
       </div>
    );
};

export default Rack;