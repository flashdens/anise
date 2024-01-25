import React from "react";

export interface ITile  {
    symbol: string,
    color: string,
    id: number
}

interface TileProps {
    tile? : ITile,
    draggable: boolean,
    onDragStart: (e: any, tile: ITile) => any,
    onDragOver: (e: any) => void,
    onDrop: (e: any, tile: ITile | undefined) => any,
    isOnRack: boolean,
    i?: number,
    extraStyles?: string
}

const Tile: React.FC<TileProps> = (props: TileProps) => {
    return (
        <div
            draggable={props.draggable || props.isOnRack}
            onDragStart={(e: any) => props.onDragStart(e, props.tile)}
            onDragOver={(e: any) => props.onDragOver(e)}
            onDrop={(e: any) => props.onDrop(e, props.tile)}
            i = {props.i}
            className={
            `flex border border-gray-200 aspect-square justify-center align-center text-center 
            text-${props.tile?.color != undefined ? props.tile.color : 'white'}-500 
            ${props.extraStyles} 
            select-none`}
        >
            {props.tile?.symbol ? props.tile.symbol : props.i}
        </div>
    )
};

export default Tile;