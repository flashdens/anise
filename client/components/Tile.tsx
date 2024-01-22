import React from "react";

export interface ITile  {
    symbol: string,
    color: string,
    id: number
}

const Tile = ({tile, onDragStart, onDragOver, onDrop, isOnRack, i, extraStyles} : {tile? : ITile|undefined, onDragStart : any, onDragOver?: any, onDrop: any, isOnRack: boolean, x?: number, y?: number, i?: number, extraStyles?: string}) => {

   const draggableProps = isOnRack ? { // TODO wtf is this
         draggable: true,
         onDragStart: (e: any) => onDragStart(e, tile),
         onDragOver: onDragOver,
         onDrop: (e: any) => onDrop(e, tile)
   } : {
       onDragOver: onDragOver,
       onDrop: (e: any) => onDrop(e, tile)
   };

   extraStyles = `${extraStyles} ${isOnRack ? "h-8 w-8" : ""}`;
    return (
        <div
            {...draggableProps}
            i = {i}
            className={`flex border border-gray-200 aspect-square justify-center text-center text-${tile ? tile.color : ''}-500 ${extraStyles} select-none`}
        >
            {tile?.symbol ? tile.symbol : i}
        </div>
    )
};

export default Tile;