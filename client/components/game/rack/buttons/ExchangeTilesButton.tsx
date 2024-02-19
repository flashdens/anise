import React, {Dispatch, SetStateAction} from "react";
import {IMove} from "@/components/game/board/BoardContainer";
import {ITile} from "@/components/game/Tile";

interface ExchangeTilesButton {
    isExchangingTiles: boolean,
    setIsExchangingTiles: any,
    playerMove: boolean,
    setExchangedTilesList: any
}


const ResetMoveButton: React.FC<ExchangeTilesButton> = (props: ExchangeTilesButton) => {
    const toggleTileExchange = () => {
        props.setIsExchangingTiles(!props.isExchangingTiles);
        props.setExchangedTilesList([]);
        console.log(props.isExchangingTiles);
    }
    return (
        <button className="px-4 py-1 text-xs transition-colors duration-300 rounded-full shadow-xl text-white bg-purple-500 hover:bg-purple-600 shadow-purple-200 dark:shadow-none disabled:bg-purple-200"
                onClick={toggleTileExchange}
                disabled={!props.playerMove}>
            { !props.isExchangingTiles ? "exchange tiles" : "cancel tile exchange"}
        </button>
    )
}

export default ResetMoveButton;
