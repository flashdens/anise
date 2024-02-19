import React, {Key} from "react";
import {
    fillLazyItemsTillLeafWithHead
} from "next/dist/client/components/router-reducer/fill-lazy-items-till-leaf-with-head";
import * as timers from "timers";

export interface ITile  {
    symbol: string,
    id: number
    color: string,
}

interface TileProps {
    tile? : ITile,
    draggable: boolean,
    onDragStart: (e: any, tile: ITile) => any,
    onDragOver: (e: any) => void,
    onDrop: (e: any, tile: ITile | undefined) => any,
    isOnRack: boolean,
    i?: null | number | Key,
    extraStyles?: string,
    isExchangingTiles: boolean,
    setExchangedTilesList: any,
    exchangedTilesList: ITile[]
}

const Tile: React.FC<TileProps> = (props: TileProps) => {

    const toggleTileForExchange = (tile: ITile) => {
        console.log(props.exchangedTilesList);
        props.setExchangedTilesList(currentList => {
            if (currentList.includes(props.tile)) {
                // If it is, remove it from the list
                return currentList.filter(item => item !== props.tile);
            } else {
                // If it's not, add it to the list
                return [...currentList, props.tile];
            }
    });
    }

    return (
        <div
            draggable={props. draggable && props.isOnRack}
            onClick={() => props.isExchangingTiles ? toggleTileForExchange(props.tile) : ""}
            onDragStart={(e: any) => props.onDragStart(e, props.tile)}
            onDragOver={(e: any) => props.onDragOver(e)}
            onDrop={(e: any) => props.onDrop(e, props.tile)}
            i = {props.i}
            className={
            `flex border border-gray-200 aspect-square h-8 w-8 justify-center align-center text-center 
            text-${props.tile?.color != undefined ? props.tile.color : 'white'}-500 
            ${props.exchangedTilesList && props.exchangedTilesList.some(tile => tile.id === props.tile.id) ? 'border-2 border-red-500' : ''} 
            ${props.extraStyles} 
            select-none`}
        >
            {props.tile?.symbol}
        </div>
    )
};

export default Tile;