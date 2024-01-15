export interface ITile  {
    symbol: string,
    color: number
}

const Tile = ({tile} : {tile : ITile}) => {
    console.log(tile)
    return (
        <div className={"tile flex border border-green-500 w-10 h-10 items-center justify-center"}>
            <h2 className={`text-${tile.color}-500`}>{tile.symbol}</h2>
        </div>
    )
};

export default Tile;